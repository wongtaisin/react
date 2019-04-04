import React from 'react'

var _ = window._
var $ = window.$
var xmui = window.xmui
var SKUResult = window.SKUResult

/**
 * 多类型表单验证
 * @return {Boolean}
 */
function validationWithInputType (value, type) {
	if (type === 'idcard') {
		var Validator = new window.IDValidator()
		if (!Validator.isValid(value)) {
			return xmui.tip('请填写正确的身份证号码')
		}
	}
	return true
}

// 线下收银页面
export default class PageCashier extends React.Component {

	constructor(props) {
		super(props)

		let data = window.data // 商品数据，在模板页中输出的变量
		let spec = window.spec // 规格组合数据
		let default_spec_data = window.default_spec_data // 默认规格

		this.state = {
			spec_stock: Object.keys(spec).length ? 1 : default_spec_data.number, // 购买数量, 如果产品无规格选项，则使用默认的规格数据,
			quantity: 1, // 表单购买数量
			spec_id: Object.keys(spec).length ? '' : default_spec_data.spec_id, // 表单已择的规格
			goods_id: data.goods_id, // 商品id
			shopname: data.shop_name, // 商铺名称
			price: data.price_range, // 当前价格, 会根据选择的规格更新
			title: data.goods_name, // 产品名称
			image: data.cover_img, // 产品缩略图,
			spec_keys_selected: []
		}

		this.renderGoodsSpecs = this.renderGoodsSpecs.bind(this)
		this.onQuantityChange = this.onQuantityChange.bind(this)
	}

	// 选择了一个规格
	onSelectionGoodsSpec (data, spec_keys_selected) {
		spec_keys_selected = spec_keys_selected || this.state.spec_keys_selected
		// data = { spec_item : { '39: 41' }, spec_group_index: 被点击的规格的数组索引(第几组) }
		let { price, spec_stock, spec_id } = this.state // 已选择的规格id数组
		this.setState({
			spec_keys_selected: spec_keys_selected,
			price: data.price ? data.price : price, // 价格，如果有值
			spec_stock: data.stock ? data.stock : spec_stock, // 更新库存, 如果有值
			spec_id: data.final_spec ? data.final_spec : spec_id // 完全的规格选择
		})
	}

	/**
	 * 渲染一组规格
	 * @param [Array] spec_array 规格数组
	 * return <GoodsSpec />
	 */
	renderGoodsSpecs (spec_array) {
		return spec_array.map((spec, index) => {
			let spec_name = Object.keys(spec)[0] // 取出规格组的名字; 例: 颜色
			let spec_data = spec[spec_name] // 取出规格的数据 [{id: "39:41", name: "大"},{.....}]
			return <GoodsSpec spec_keys_selected={this.state.spec_keys_selected} spec_group_index={index} onSelected={(data) => { this.onSelectionGoodsSpec(data) }} key={index} index={index} title={spec_name} data={spec_data} />
		})
	}

	// 更新了库存
	onQuantityChange (quantity) {
		this.setState({
			quantity: quantity
		})
	}

	render () {
		return (
			<section id='page-cashier'>
				<HeaderBar shopname={this.state.shopname} />
				<form id='form-cashier' className='cashier-body'>
					<Goods image={this.state.image} title={this.state.title} price={this.state.price} />
					{this.renderGoodsSpecs(window.data.specifications)}
					<input type='hidden' name='goods_id' defaultValue={this.state.goods_id} />
					<input type='hidden' name='is_cashier' value='1' />
					<input type='hidden' name='spec_id' className='required' data-tip='请选择规格' value={this.state.spec_id} />
					<input type='hidden' name='channel' defaultValue='wx_pub' />
					<BuyQuantity name='quantity' onQuantityChange={this.onQuantityChange} quantity={this.state.quantity} maxQuantity={this.state.spec_stock} />
					<CustomFromGroup configs={window.data.field_options} />
					<FooterBar price={this.state.price * this.state.quantity} />
				</form>
			</section>
		)
	}
}

// 自定义表单
class CustomFromGroup extends React.Component {

	constructor(props) {
		super(props)
	}

	renderFormList () {
		/** {type} 类型
		 * text  文本框
		 * number 数字
		 * email  邮箱
		 * date  日期选择
		 * time  时间 （15：00）
		 * idcard  身份证
		 */
		return this.props.configs.map((item, index) => {
			return <BaseInput key={index} required={item.is_needed} name={`field_values[${item.name}]`} label={item.name} type={item.type} />
		})
	}

	render () {
		return (
			<section className='ui-custom-from-group'>
				{this.renderFormList()}
			</section>
		)
	}
}

// 顶部栏
class HeaderBar extends React.Component {

	render () {
		return (
			<section className='ui-cashier-header-bar'>
				<div className='left'>
					<span className='ui-cashier-small-logo' />
					<span>线下收银</span>
				</div>
				<span className='shopname'>{this.props.shopname}</span>
			</section>
		)
	}
}

// 产品信息
class Goods extends React.Component {

	render () {
		return (
			<section className='ui-cashier-goods'>
				<img src={this.props.image} className='ui-cashier-goods-img' alt='' />
				<div className='ui-cashier-goods-right'>
					<p className='ui-cashier-goods-title'>{this.props.title}</p>
					<div className='ui-cashier-goods-price'>¥ {this.props.price}</div>
				</div>
			</section>
		)
	}
}

// 产品规格选择组件
class GoodsSpec extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			// spec_keys_selected: [], // 已经选择的规格id
			selected_index: this.props.selectedIndex || null // 默认选中哪个,
		}

		this.renderItems = this.renderItems.bind(this)
		this.onClickItem = this.onClickItem.bind(this)
	}

	/**
	 * 点击了规格项
	 * @param {Object} spec_item 规格项数据 {id: 'xx:xx', name:'xxx'}
	 * @param {Number} spec_group_index 规格组索引
	 * @param {Number} spec_item_index 规格项索引
	 * @param {Boolean} can_select 是否可选
	 */
	onClickItem (spec_item, spec_group_index, spec_item_index, can_select) {

		// data  ={ spec_item : { '39: 41' }, spec_group_index: 被点击的规格的数组索引(第几组) }
		let { spec_keys_selected } = this.props // 已选择的规格id数组
		spec_keys_selected[spec_group_index] = spec_item.id // 更新已选择的规格id数组
		// window.spec_keys_selected[spec_group_index] = spec_item.id;

		if (!can_select) {
			return false
		}

		let opts = {
			spec_item: spec_item,
			spec_group_index: spec_group_index
		}

		this.setState({
			// spec_keys_selected: spec_keys_selected, // 已选择的规格id
			selected_index: spec_item_index
		}, () => {
			// 如果全部选完了, 更新价格
			if (_.every(spec_keys_selected) && spec_keys_selected.length === window.data.specifications.length) {
				let final_spec = window.spec[spec_keys_selected.join(';')]
				opts.price = final_spec.price
				opts.stock = final_spec.number
				opts.final_spec = window.spec[spec_keys_selected.join(';')].spec_id
			}
			this.props.onSelected(opts, spec_keys_selected) // 父容器回调
		})
	}

	renderItems () {
		let { spec_keys_selected } = this.props
		let { spec_group_index } = this.props
		let _spec_keys = [...spec_keys_selected] // 复制一份已选规格的数组
		return this.props.data.map((item, index) => {

			// 取得笛卡尔集中的规格项, 在没有选择任何规格项时会用到这个
			let SKU_ITEM = SKUResult[item.id]

			// 如果已经选择了规格，并且规格类型数量大于1
			if (spec_group_index === this.props.index && spec_keys_selected.length && spec_keys_selected.length > 1 && spec_group_index >= 0) {
				_spec_keys[spec_group_index] = item.id // 将相应规格组中的id改为当前规格的id

				// 由于选择顺序不同，spec_keys_selected中的元素有可能为undefined
				// 例如： ['39:42',undefined,'36:119'], join后的字符串是 '39:42;;36:119'
				// 需要去除多余的;号才能正确查找到组合数据
				_spec_keys = _.compact(_spec_keys)
				SKU_ITEM = SKUResult[_spec_keys.join(';').replace(';;', ';')]
			}

			let canSelect = SKU_ITEM.count // 是否可选，由库存决定
			let className = `spec-item ${canSelect === 0 ? 'disabled' : ''} ${index === this.state.selected_index ? 'active' : ''}`
			return <span onClick={() => { this.onClickItem(item, spec_group_index, index, canSelect) }} key={index} className={className}>{item.name}</span>
		})
	}

	render () {
		return (
			<section className='ui-cashier-goods-spec'>
				<div className='spec-header'>{this.props.title}</div>
				<div className='spec-body'>
					{this.renderItems()}
				</div>
			</section>
		)
	}
}

// 产品规格
class BuyQuantity extends React.Component {

	constructor(props) {
		super(props)
	}

	// 点击了减少购买数量
	onClickDecrease () {
		if (this.props.quantity >= 1) {
			this.props.onQuantityChange(this.props.quantity - 1)
		}
	}

	// 点击了增加购买数量
	onClickIncrease () {
		if (this.props.quantity < this.props.maxQuantity) {
			this.props.onQuantityChange(this.props.quantity + 1)
		}
	}

	render () {
		let { maxQuantity, quantity } = this.props
		// - + 按钮的class(是否可点击的样式更变)
		let decrease_button_classes = `decrease ${quantity <= 1 ? 'disabled' : ''}`
		let increase_button_classes = `increase ${quantity >= maxQuantity ? 'disabled' : ''}`

		if (!maxQuantity) return null // 如果最大库存为零，则不显示购买数量选项
		return (
			<section className='ui-cashier-buy-quantity'>
				<span className='label'>购买数量</span>
				<div className='number-input'>
					<span className={`button ${decrease_button_classes}`} onClick={this.onClickDecrease.bind(this)}><i className='iconfont icon-iconmianxingshujujian' /></span>
					<input type='text' readOnly={true} className='input' name={this.props.name} value={this.props.quantity} />
					<span className={`button ${increase_button_classes}`} onClick={this.onClickIncrease.bind(this)}><i className='iconfont icon-jia1' /></span>
				</div>
			</section>
		)
	}
}

// 身份证输入
class BaseInput extends React.Component {

	constructor(props) {
		super(props)
	}

	render () {
		// placeholder 中对应的提示文字
		let input_type_map_text = {
			'text': '填写',
			'number': '填写',
			'email': '填写',
			'date': '选择',
			'time': '选择',
			'idcard': '填写'
		}

		// input框的类型映射
		let input_type_map = {
			'text': 'text',
			'number': 'number',
			'email': 'email',
			'date': 'text',
			'time': 'text',
			'idcard': 'text'
		}

		// 特殊表单的class
		// 例如日期和时间表单项需要增加ui-date才会触发显示UI组件
		let input_type_map_class = {
			'text': '',
			'number': '',
			'email': '',
			'date': 'ui-date',
			'time': 'ui-time',
			'idcard': ''
		}

		// 不能编辑的类型
		let readonly_type = [
			'date',
			'time'
		]

		// 输入框是否可编辑，如日期这类组件只需要选择，不需要用户自己编辑
		let is_readonly = readonly_type.indexOf(this.props.type) >= 0

		// 错误提示
		let tip_text = `请${input_type_map_text[this.props.type]}${this.props.label}. `
		let tip_text_error = `请输入正确的${this.props.label}`

		// placeholder提示
		let placeholder_text = `${tip_text}${this.props.required === 'true' ? '必填项' : ''}`

		return (
			<section className='ui-base-input'>
				<span className='label'>{this.props.label}</span>
				<input
					data-type={this.props.type}
					data-tip={tip_text_error}
					name={this.props.name}
					readOnly={is_readonly}
					type={input_type_map[this.props.type]}
					className={`input-text ${this.props.required === 'true' ? 'required' : ''} ${input_type_map_class[this.props.type]}`}
					placeholder={placeholder_text}
				/>
			</section>
		)
	}
}

// 底部
class FooterBar extends React.Component {

	constructor(props) {
		super(props)
		this.is_pendding = false
	}

	onClickPayment () {
		if (this.is_pendding) {
			return false
		}

		// 遍历所有必填的表单
		let required_inputs = $('.required')

		for (var i = 0; i < required_inputs.length; i++) {
			let $input = $(required_inputs[i])

			if ($input.val() === '') {
				return xmui.tip($input.data('tip'))
			}

			if (!validationWithInputType($input.val(), $input.data('type'))) {
				return xmui.tip($input.data('tip'))
			}

			// 校验结束提交表单
			if (required_inputs.length === (i + 1)) {
				this.is_pendding = true
				$.post(window.pay_url, $('#form-cashier').serialize(), (res) => {
					if (res.code === 0) {
						window.location.href = "http://wx.xizi.com/pingpay.html?pid=" + res.data.id
					} else {
						xmui.tip(res.message)
					}
					this.is_pendding = false
				})
			}
		}
	}

	render () {
		return (
			<section className='ui-cashier-footer-bar'>
				<span className='left price'>合计：<em className='num'>￥{this.props.price || 0}</em></span>
				<a className='right button-pay' onClick={this.onClickPayment.bind(this)}>微信支付</a>
			</section>
		)
	}
}
