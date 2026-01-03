import type { TableProps } from 'antd'
import { Button, Card, Flex, Space, Table, Tag } from 'antd'
import React from 'react'

interface DataType {
  key: string
  title: string
  date: string
  location: string
  status: string
  participants: number
}

const columns: TableProps<DataType>['columns'] = [
  { title: '会议名称', dataIndex: 'title', key: 'title' },
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: '地点', dataIndex: 'location', key: 'location' },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    render: status => {
      // 0: 未开始, 1: 进行中, 2: 已结束, 3: 完成
      const statusMap: Record<string, { type: string; text: string }> = {
        0: { type: 'gray', text: '未开始' },
        1: { type: 'blue', text: '进行中' },
        2: { type: 'red', text: '已结束' },
        3: { type: 'green', text: '完成' }
      }

      return (
        <Tag color={statusMap[status]?.type || 'gray'}>{statusMap[status]?.text || status}</Tag>
      )
    }
  },
  { title: '参与人数', dataIndex: 'participants', key: 'participants' },
  {
    title: '操作',
    key: 'action',
    render: (_, record: DataType) => {
      const status0 = record.status === '0' // 已结束的会议不能操作
      return (
        <Space size="small">
          <Button type="link" size="small">
            {record.status === '0' ? '报名' : '查看'}
          </Button>

          {status0 && (
            <>
              <Button color="orange" variant="link" size="small">
                编辑
              </Button>
              <Button type="link" size="small" danger>
                删除
              </Button>
            </>
          )}
        </Space>
      )
    }
  }
]

const data: DataType[] = [
  {
    key: '1',
    title: '年度技术大会',
    date: '2026-01-15',
    location: '北京会议中心',
    status: '0',
    participants: 500
  },
  {
    key: '2',
    title: '产品发布会',
    date: '2026-01-20',
    location: '上海展览馆',
    status: '1',
    participants: 300
  },
  {
    key: '3',
    title: '季度总结会',
    date: '2025-12-30',
    location: '深圳科技园',
    status: '2',
    participants: 150
  },
  {
    key: '4',
    title: '年会',
    date: '2025-12-30',
    location: '深圳科技园',
    status: '3',
    participants: 150
  }
]

const newSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i.toString() + 10,
  title: `会议${i}`,
  date: '2026-01-15',
  location: '北京会议中心',
  status: '0',
  participants: Number(`50${i}`)
}))

const dataSource = [...data, ...newSource]

const rowSelection: TableProps<DataType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.status === '2', // 已结束的会议不能选择
    name: record.title
  })
}

const loading = false

const ConferenceList: React.FC = () => (
  <Card title="会议列表" variant="borderless" style={{ width: '100%' }}>
    <Flex gap="small" wrap style={{ marginBottom: 16 }}>
      <Button color="primary" variant="filled" size="small">
        新增
      </Button>

      <Button color="danger" variant="filled" size="small">
        删除
      </Button>
    </Flex>

    <Table<DataType>
      rowSelection={{ ...rowSelection }}
      columns={columns}
      dataSource={dataSource}
      bordered
      // size="middle"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  </Card>
)

export default ConferenceList
