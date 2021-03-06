import React from 'react';
import {
  Form,
  Button,
  Space,
  DatePicker,
  Select,
  Popconfirm,
  Table,
  Upload,
  message,
  Input,
  InputNumber,
} from 'antd';
import PicturesWall from './PicturesWall';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { getCookie } from '@/pages/BasicComponents/request';
import { follInfosave, follInfoupdate, follInfodelete } from '../../service';
import moment from 'moment';

const fw_Options = [
  { label: '电话', value: '1' },
  { label: '门诊', value: '2' },
  { label: '住院', value: '3' },
];
const re_Options = [
  { label: 'PD-进展', value: '1' },
  { label: 'SD-稳定', value: '2' },
  { label: 'PR-部分缓解', value: '3' },
  { label: 'CR-完全缓解', value: '4' },
  { label: '术后未发现新病灶', value: '5' },
];
const ls_Options = [
  { label: '死亡', value: '1' },
  { label: '存活', value: '2' },
  { label: '失联', value: '3' },
];
const it_Options = [
  { label: 'X光', value: '1' },
  { label: '超声', value: '2' },
  { label: 'CT', value: '3' },
  { label: 'MRI', value: '4' },
  { label: 'PET/CT', value: '5' },
];

function onChange(text, record, index) {
  record[index] = text;
}

class FollowUpInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.initialValues);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 40,
        render: (text, record, index) => {
          return <span>{index + 1}</span>;
        },
      },
      {
        title: '随访日期',
        dataIndex: 'date',
        key: 'date',
        width: 120,
        render: (text, record, index) => (
          <DatePicker
            defaultValue={moment(record['date'])}
            onChange={(e, eString) => {
              onChange(eString, record, 'date');
            }}
          />
        ),
      },
      {
        title: '随访方式',
        dataIndex: 'folMet',
        key: 'folMet',
        width: 120,
        render: (text, record, index) => (
          <Select
            defaultValue={String(record['folMet'])}
            style={{ width: 120 }}
            options={fw_Options}
            onChange={e => {
              onChange(e, record, 'folMet');
            }}
          />
        ),
      },
      {
        title: '疗效评估',
        dataIndex: 'effEva',
        key: 'effEva',
        width: 120,
        render: (text, record, index) => (
          <Select
            defaultValue={String(record['effEva'])}
            style={{ width: 120 }}
            options={re_Options}
            onChange={e => {
              onChange(e, record, 'effEva');
            }}
          />
        ),
      },
      {
        title: '生存状态',
        dataIndex: 'livSta',
        key: 'livSta',
        width: 120,
        render: (text, record, index) => (
          <Select
            defaultValue={String(record['livSta'])}
            style={{ width: 120 }}
            options={ls_Options}
            onChange={e => {
              onChange(e, record, 'livSta');
            }}
          />
        ),
      },
      {
        title: '影像类型',
        dataIndex: 'imaFilType',
        key: 'imaFilType',
        width: 120,
        render: (text, record, index) => (
          <Select
            defaultValue={String(record['imaFilType'])}
            style={{ width: 120 }}
            options={it_Options}
            onChange={e => {
              onChange(e, record, 'imaFilType');
            }}
          />
        ),
      },
      // {
      //   title: 'suv',
      //   dataIndex: 'suv',
      //   width: '10%',
      //   render: (text, record, index) => (
      //     <InputNumber
      //       onChange={e => {
      //         onChange(e, record, 'suv');
      //       }}
      //     />
      //   ),
      // },
      {
        title: '影像',
        dataIndex: 'savFilPath',
        key: 'savFilPath',
        width: 80,
        render: (text, record, index) => (
          <Upload
            name="file[]" //发到后端的文件参数名
            //action="/api/upload" //上传的地址
            action="/api/upload" //上传的地址
            headers={{
              authorization: 'authorization-text',
              token: getCookie('token'),
            }}
            multiple={true}
            data={{ pid: this.props.pid }}
            defaultFileList={(record['savFilPath'] || '')
              .split(',')
              .filter(x => x !== '')
              .map(path => ({
                uid: `${index}_${path}`,
                name: path.split('/')[path.split('/').length - 1],
                status: 'done',
                url: `/file/${this.props.pid}/${
                  path.split('/')[path.split('/').length - 1]
                }`,
              }))}
            onChange={info => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                var fileList = this.state.file_list;
                fileList = fileList.concat(info.file.response.path);
                console.log(fileList);
                record['savFilPath'] = fileList.toString();
                this.setState({ file_list: fileList });
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
            onRemove={info => {
              var fileList = record['savFilPath']
                .split(',')
                .filter(x => x.slice(-info.name) !== info.name);
              record['savFilPath'] = fileList.toString();
            }}
          >
            <Button>
              <UploadOutlined /> 上传报告
            </Button>
          </Upload>
        ),
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        width: 80,
        render: (text, record, index) => (
          <Input
            onChange={e => {
              onChange(e.target.value, record, 'remarks');
            }}
          />
        ),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        width: 80,
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <span>
              <Popconfirm
                title="确认删除（不可恢复）？"
                onConfirm={() => this.handleDelete(record)}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          ) : null,
      },
    ];
    console.log(this.props.initialValues);
    this.state = {
      dataSource: this.props.initialValues || [],
      //dataSource: [],
      file_list: [],
      count: 0,
    };
  }
  molDefaultFileList = [];
  handleDelete = async record => {
    if (record.id) {
      const res = await follInfodelete({ pid: this.props.pid, id: record.id });
      if (res.code == 200) {
        console.log('删除成功');
        const dataSource = [...this.state.dataSource];
        this.setState({
          dataSource: dataSource.filter(item => item.id !== record.id),
        });
        message.success('删除成功');
      } else {
        message.error('删除失败，' + res.msg);
        console.log('删除失败');
      }
    } else {
      const dataSource = [...this.state.dataSource];
      this.setState({
        dataSource: dataSource.filter(item => item.key !== record.key),
      });
      console.log('删除成功');
    }
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      number: count,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          添加
        </Button>
        <Table
          //components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: '1400px' }}
        />
        <Button
          type="primary"
          htmlType="submit"
          onClick={async e => {
            console.log(this.state.dataSource);

            const res = await follInfoupdate({
              pid: this.props.pid,
              data: this.state.dataSource,
            });
            if (res.code === 200) {
              this.setState({ dataSource: res.data });
              message.success('保存成功');
            } else message.error('保存失败，' + res.msg);
          }}
        >
          保存
        </Button>
      </div>
    );
  }
}

export default FollowUpInfo;
