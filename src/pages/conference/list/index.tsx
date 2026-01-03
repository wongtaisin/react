import type { TableProps } from 'antd'
import { Button, Space, Table, Tag } from 'antd'
import React from 'react'

interface ConferenceType {
  key: string
  title: string
  date: string
  location: string
  status: string
  participants: number
}

const columns: TableProps<ConferenceType>['columns'] = [
  {
    title: '会议名称',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: '地点',
    dataIndex: 'location',
    key: 'location'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    render: status => {
      const colorMap: Record<string, string> = {
        进行中: 'green',
        已结束: 'default',
        未开始: 'blue'
      }
      return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
    }
  },
  {
    title: '参与人数',
    dataIndex: 'participants',
    key: 'participants'
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="small">
        <Button type="link" size="small">
          查看
        </Button>
        <Button type="link" size="small">
          编辑
        </Button>
        <Button type="link" size="small" danger>
          删除
        </Button>
      </Space>
    )
  }
]

const data: ConferenceType[] = [
  {
    key: '1',
    title: '年度技术大会',
    date: '2026-01-15',
    location: '北京会议中心',
    status: '未开始',
    participants: 500
  },
  {
    key: '2',
    title: '产品发布会',
    date: '2026-01-20',
    location: '上海展览馆',
    status: '未开始',
    participants: 300
  },
  {
    key: '3',
    title: '季度总结会',
    date: '2025-12-30',
    location: '深圳科技园',
    status: '已结束',
    participants: 150
  }
]

const ConferenceList: React.FC = () => (
  <div>
    <div style={{ marginBottom: 16 }}>
      <Button type="primary">新增会议</Button>
    </div>
    <Table<ConferenceType> columns={columns} dataSource={data} />
  </div>
)

export default ConferenceList
