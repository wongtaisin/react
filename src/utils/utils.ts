class utils {
  /**
   * @desc 深拷贝，普通拷贝，不需要函数的拷贝和循环引用处理
   * @param {any} data - 要拷贝的数据
   * @returns {any} 拷贝后的数据
   */
  deepClone = <T>(data: T): T => {
    if (typeof data !== 'object' || data === null) return data
    return JSON.parse(JSON.stringify(data))
  }

  /**
   * @desc 递归深拷贝，处理循环引用和复杂对象
   * @param {any} data - 要拷贝的数据
   * @returns {any} 拷贝后的数据
   */
  deepCopyRecursive(obj: any) {
    if (typeof obj !== 'object' || obj === null) return obj
    const copy: any = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = this.deepCopyRecursive(obj[key])
      }
    }
    return copy
  }

  /**
   * 根据时间戳和格式返回格式化的日期字符串
   * @param {number} timestamp - 时间戳
   * @param {string} format - 日期格式
   * @returns {string} 格式化后的日期字符串
   * @example
   * @demo formatDate(1507513800642, 'yyyy/MM/dd hh:mm:ss') => '2017/10/09 09:50:00'
   * @demo formatDate(1507513800642, 'yyyy-MM-dd hh:mm:ss') => '2017-10-09 09:50:00'
   * @demo formatDate(1507513800642, 'yyyy.MM.dd , hh-mm-ss') => '2017.10.09 , 09-50-00'
   */
  formatDate = (timestamp: number, format: string): string => {
    if (!timestamp) return ''

    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return ''

    const timeUnits: Record<string, number> = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }

    format = format.replace(/(y+)/g, match => (date.getFullYear() + '').slice(-match.length))

    Object.entries(timeUnits).forEach(([key, value]) => {
      format = format.replace(new RegExp(`(${key})`), match =>
        match.length === 1 ? String(value) : ('00' + value).slice(-match.length)
      )
    })

    return format
  }

  /**
   * @desc 格式化日期时间
   * @param {Date} date - 日期对象
   * @param {boolean} [includeTime] - 是否包含时间,默认false只返回日期
   * @returns {string} 格式化后的日期时间字符串
   */
  formatDateTime = (date: Date | string | number, includeTime = false): string => {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return ''

    const padZero = (num: number): string => num.toString().padStart(2, '0') // 补零

    const dateParts = [
      dateObj.getFullYear(),
      padZero(dateObj.getMonth() + 1),
      padZero(dateObj.getDate())
    ]

    if (!includeTime) return dateParts.join('-')

    return `${dateParts.join('-')} ${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}`
  }

  /**
   * @desc 验证并格式化数字
   * @param {number | string} value - 要验证的数值
   * @returns {number} 格式化后的数值,非法输入返回0
   */
  validateNumber = (value: number | string): number => {
    const strValue = String(value) // 转换为字符串处理
    if (/^[1-9]\d*$/.test(strValue)) return Number(strValue) // 判断是否为正整数
    if (/^\d+(\.\d+)?$/.test(strValue)) return Number(Number(strValue).toFixed(4)) // 判断是否为合法小数，保留4位小数
    return 0 // 非法输入返回0
  }

  /**
   * @desc 节流函数 - 限制函数在指定时间内只执行一次
   * @param {Function} callback - 需要执行的函数
   * @param {number} wait - 等待时间(毫秒),默认1000
   * @returns {Function} 节流后的函数
   */
  throttle = <T extends (...args: any[]) => any>(
    callback: T,
    wait: number = 1000
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let lastExecTime = 0

    return function (this: unknown, ...args: Parameters<T>) {
      const currentTime = Date.now()
      const remainingTime = lastExecTime + wait - currentTime

      if (remainingTime <= 0) {
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        lastExecTime = currentTime
        callback.apply(this, args)
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastExecTime = Date.now()
          timeoutId = null
          callback.apply(this, args)
        }, remainingTime)
      }
    }
  }

  /**
   * @desc 防抖函数 - 延迟执行函数,在等待时间内如果再次调用会重新计时
   * @param {Function} callback - 需要执行的函数
   * @param {number} wait - 等待时间(毫秒),默认1000
   * @returns {Function} 防抖后的函数
   */
  debounce = <T extends (...args: any[]) => any>(
    callback: T,
    wait: number = 1000
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return function (this: unknown, ...args: Parameters<T>) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        callback.apply(this, args)
        timeoutId = null
      }, wait)
    }
  }

  /**
   * @desc 将对象转换为URL查询字符串
   * @param {Record<string, any>} params - 要转换的参数对象
   * @returns {string} 转换后的URL查询字符串
   */
  urlJsonList = (params: Record<string, any>): string => {
    return Object.entries(params)
      .filter(([_, value]) => value != null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&')
  }

  /**
   * @desc 验证手机号码
   * @param {string | number} value - 要验证的电话号码
   * @returns {Promise<void>} 验证结果
   */
  isMobileNumber = (value: string | number): Promise<void> => {
    if (!value) {
      return Promise.reject(new Error('请输入电话号码'))
    }

    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(String(value))
      ? Promise.resolve()
      : Promise.reject(new Error('手机号码格式如:138xxxx8754'))
  }

  /**
   * @desc 计算表格列宽度
   * @param {string} ATTRIBUTE_NAME - 列属性名
   * @param {any[]} TABLE_DATA - 数据数组
   * @param {number} MIN_WIDTH - 最小列宽度,默认80px
   * @returns {number} 列宽度(px)
   */
  // 为了计算更精准的列宽，我们可以考虑以下几点改进：
  // 1. 遍历整个列的所有数据，而不只是找到第一个非空值。
  // 2. 考虑字符的实际渲染情况，比如标点符号、特殊字符等。
  // 3. 添加一些额外的边距以确保内容显示完整。
  flexColumnWidth = (ATTRIBUTE_NAME: string, TABLE_DATA: any[], MIN_WIDTH = 80): number => {
    // const MIN_WIDTH = 80 // 最小列宽
    const PADDING = 20 // 额外的边距，确保内容不会紧贴边框
    // 字符宽度根据实际调整
    const CHAR_WIDTH_MAP = {
      en: 8, // 英文字符宽度
      num: 10, // 数字字符宽度
      zh: 16, // 中文字符宽度
      ot: 12 // 其它字符宽度
    }

    // 参数验证
    if (!Array.isArray(TABLE_DATA) || !TABLE_DATA.length || typeof ATTRIBUTE_NAME !== 'string') {
      return MIN_WIDTH
    }

    // 获取列的所有内容
    const columnContents = TABLE_DATA.map(item => item?.[ATTRIBUTE_NAME] || '')

    // 计算最大宽度
    let maxWidth = 0
    columnContents.forEach(content => {
      const flexWidth = Array.from(String(content)).reduce((width, char) => {
        if (/[A-Za-z]/.test(char)) return width + CHAR_WIDTH_MAP.en
        if (/\d/.test(char)) return width + CHAR_WIDTH_MAP.num
        if (/[\u4e00-\u9fa5]/.test(char)) return width + CHAR_WIDTH_MAP.zh
        return width + CHAR_WIDTH_MAP.ot
      }, 0)
      maxWidth = Math.max(maxWidth, flexWidth)
    })

    // 加上额外的边距
    const finalWidth = maxWidth + PADDING

    return Math.max(MIN_WIDTH, finalWidth)
  }

  /**
   * @desc 计算数组中指定属性的数值总和
   * @param {string} property - 属性名
   * @param {any[]} arr - 数据数组
   * @param {number} to - 小数位数,默认0
   * @returns {string} 总和(整数字符串)
   */
  getAllNumber = (property: string, arr: any[], to: number = 0): any => {
    const amount = arr.reduce((sum: any, item: any) => {
      const value = parseFloat(item[property])
      if (value < 0) {
        return sum - Math.abs(value)
      } else {
        return sum + value
      }
    }, 0)
    return amount > 0 ? Number(amount).toFixed(to) : amount < 0 ? Number(amount).toFixed(to) : '0'
  }

  /**
   * @desc 权限验证
   * @param {string} str - 权限字符串
   * @param {string[]} permissions - 权限数组
   * @returns {boolean} 验证结果
   */
  authPermission = (str: string, permissions: string[]): boolean => {
    const all_permission = '*:*:*'

    // 检查参数有效性
    if (!str || !permissions || !Array.isArray(permissions)) {
      return false
    }

    return permissions.some(permission => permission === all_permission || permission === str)
  }

  /**
   * @desc 获取当前月份的日期列表
   * @param {string} yearMonth - 年月字符串
   * @returns {any[]} 日期列表
   */
  monthDates = (yearMonth: string) => {
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    if (!yearMonth) return []

    const [yearStr, monthStr] = yearMonth.split('年')
    const year = parseInt(yearStr)
    const month = parseInt(monthStr)
    if (isNaN(year) || isNaN(month)) return []

    const daysInMonth = new Date(year, month, 0).getDate()

    return Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month - 1, index + 1)
      return {
        date: index + 1,
        weekDay: weekDays[date.getDay()]
      }
    })
  }

  /**
   * @desc 计算时间差异
   * @param {string} startTime - 开始时间
   * @param {string} endTime - 结束时间
   * @returns {Record<string, number>} 时间差异对象
   */
  timeDifference = (startTime: string, endTime: string) => {
    // 将时间字符串转换为Date对象
    const start = new Date(startTime)
    const end = new Date(endTime)

    // 计算时间差异（以毫秒为单位）
    const difference = end.getTime() - start.getTime()

    // 将时间差异转换为天、小时、分钟和秒
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  }

  /**
   * 构造树型结构数据
   * @param {*} data 数据源
   * @param {*} id id字段 默认 'id'
   * @param {*} parentId 父节点字段 默认 'parentId'
   * @param {*} children 孩子节点字段 默认 'children'
   */
  handleTree = (data: any[], id?: string, parentId?: string, children?: string) => {
    let config = {
      id: id || 'id',
      parentId: parentId || 'parentId',
      childrenList: children || 'children'
    }

    var childrenListMap: any = {}
    var nodeIds: any = {}
    var tree = []

    for (let d of data) {
      let parentId = d[config.parentId]
      if (childrenListMap[parentId] == null) {
        childrenListMap[parentId] = []
      }
      nodeIds[d[config.id]] = d
      childrenListMap[parentId].push(d)
    }

    for (let d of data) {
      let parentId = d[config.parentId]
      if (nodeIds[parentId] == null) {
        tree.push(d)
      }
    }

    const adaptToChildrenList = (o: any) => {
      if (childrenListMap[o[config.id]] !== null) {
        o[config.childrenList] = childrenListMap[o[config.id]]
      }
      if (o[config.childrenList]) {
        for (let c of o[config.childrenList]) {
          adaptToChildrenList(c)
        }
      }
    }

    for (let t of tree) {
      adaptToChildrenList(t)
    }

    return tree
  }

  /**
   * @desc 获取指定天数前的日期字符串
   * @param {number} days - 天数,默认0
   * @returns {string} 格式化后的日期字符串 2025-08-14
   * @example
   * @demo selectedDate(0) => '2025-08-14'
   * @demo selectedDate(1) => '2025-08-13'
   * @demo selectedDate(30) => '2025-07-15'
   */
  selectedDate = (days: number = 0) => {
    const date = new Date()
    date.setDate(date.getDate() - days)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  /**
   * @desc 压缩Base64图片
   * @param base64 源图片
   * @param rate 缩放比例，越大越小
   * @returns 压缩后的Base64图片
   * @example
   * @demo compressBase64(base64, 0.8) => 压缩后的Base64图片
   * @demo compressBase64(base64, 1) => 更小的Base64图片
   * @demo compressBase64(base64, 2) => 最小的Base64图片
   * @note 如果压缩后图片仍然大于750*1334，则继续压缩，直到小于该值
   * @note 该函数异步执行，返回一个Promise对象
   */
  compressBase64 = (base64: string, rate: number): Promise<string> => {
    return new Promise(resolve => {
      const img = new window.Image()
      img.src = base64
      img.onload = () => {
        const w = img.width / rate
        const h = img.height / rate
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h)
          const newBase64 = canvas.toDataURL('image/jpeg')
          canvas.toBlob(blob => {
            if (blob && blob.size > 750 * 1334) {
              //如果还大，继续压缩
              this.compressBase64(newBase64, rate).then(resolve)
            } else {
              resolve(newBase64)
            }
          }, 'image/jpeg')
        } else {
          // 如果获取不到 context，则直接返回原图
          resolve(base64)
        }
      }
      img.onerror = () => {
        // 图片加载失败时返回原图
        resolve(base64)
      }
    })
  }

  /**
   * 导出表格为 Excel 文件
   * @param table 表格元素或表格元素的 id
   * @param name 工作表名称（可选）
   */
  tableToExcel = (() => {
    const uri = 'data:application/vnd.ms-excel;base64,'
    const template = `
		<html xmlns:o="urn:schemas-microsoft-com:office:office"
			  xmlns:x="urn:schemas-microsoft-com:office:excel"
			  xmlns="http://www.w3.org/TR/REC-html40">
			<head>
				<meta charset="utf-8">
				<style>
					th,td {border: 0.1px solid #000; font-size: 14px; background: #fff;}
					table {border-collapse: collapse;}
				</style>
				<!--[if gte mso 9]>
				<xml>
					<x:ExcelWorkbook>
						<x:ExcelWorksheets>
							<x:ExcelWorksheet>
								<x:Name>{worksheet}</x:Name>
								<x:WorksheetOptions>
									<x:DisplayGridlines/>
								</x:WorksheetOptions>
							</x:ExcelWorksheet>
						</x:ExcelWorksheets>
					</x:ExcelWorkbook>
				</xml>
				<![endif]-->
			</head>
			<body>
				<table>{table}</table>
			</body>
		</html>
	`

    const base64 = (s: string) => window.btoa(unescape(encodeURIComponent(s)))

    const format = (s: string, c: Record<string, string>) => s.replace(/{(\w+)}/g, (_m, p) => c[p])

    return (table: string | HTMLElement, name = '表格') => {
      let tableElement: HTMLElement | null
      if (typeof table === 'string') {
        tableElement = document.getElementById(table)
      } else {
        tableElement = table
      }

      if (!tableElement) {
        console.error('未找到表格元素')
        return
      }

      // 处理图片高度，避免签名字体被遮挡
      const images = tableElement.querySelectorAll('img')
      images.forEach(img => {
        // 调整图片高度，避免遮挡签名字体
        img.setAttribute('height', '38')
      })

      // 克隆表格，避免直接修改原表格内容
      const tableClone = tableElement.cloneNode(true) as HTMLElement

      // 移除表格内可能的交互元素（如按钮、输入框等），只保留纯展示内容
      tableClone.querySelectorAll('button,input,select,textarea').forEach(el => el.remove())

      const ctx = {
        worksheet: name || 'Worksheet',
        table: tableClone.innerHTML
      }
      const excelData = uri + base64(format(template, ctx))

      // 优化下载方式，兼容性更好
      const a = document.createElement('a')
      a.href = excelData
      a.download = name + '.xls'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  })()
}

export default new utils()
