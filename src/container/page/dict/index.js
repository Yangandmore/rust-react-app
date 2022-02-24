import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, DatePicker, Loading, Message, Pagination } from 'element-react';
import { SearchInput, TableView, DialogView } from '../../../component';
import { mainSelect, dictAction, dictSelect } from '../../../redux';
import { StringUtils } from '../../../utils';

class Dict extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dictList: PropTypes.object.isRequired,
    fetch: PropTypes.bool,
    msg: PropTypes.string,
    err: PropTypes.string,
    pageHeight: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchForm: {
        name: '',
        code: '',
        state: '',
        createDate: null,
      },
      isSearchForm: {},
      currentPage: 1,
      pageCount: 10,
      addVisible: false,
      deleteVisible: false,
      dialogTitle: '',
      dialogForm: {
        name: '',
        code: '',
        state: '',
      }
    };
  }

  componentDidMount() {
    // 请求接口
    this.listDict(this.state.currentPage);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let res = { fetch: nextProps.fetch };
    if (prevState.fetch && !nextProps.fetch) {
      res = {
        addVisible: false,
        deleteVisible: false,
        dialogForm: {
          name: '',
          code: '',
          state: '',
        },
        ...res };
      if (!StringUtils.isEmpty(nextProps.msg)) {
        Message({
          message: nextProps.msg,
          type: 'success'
        });
      }
      if (!StringUtils.isEmpty(nextProps.err)) {
        Message.error(nextProps.err);
      }
    }
    return res;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.fetch) {
      this.listDict(1);
    }
  }

  onChange(data, key, value) {
    this.setState((prev) => ({
      [data]: { ...prev.[data], [key]: value }
    }));
  }

  listDict = (pageIndex) => {
    this.props.dispatch(dictAction.actionList({
      page_index: pageIndex,
      page_count: this.state.pageCount,
      name: StringUtils.isEmpty(this.state.isSearchForm.name) ? null : this.state.isSearchForm.name,
      code: StringUtils.isEmpty(this.state.isSearchForm.code) ? null : this.state.isSearchForm.code,
      state: StringUtils.isEmpty(this.state.isSearchForm.state) ? null : parseInt(this.state.isSearchForm.state, 10),
    }));
  }

  addDict = () => {
    this.props.dispatch(dictAction.actionAdd({
      name: this.state.dialogForm.name,
      code: this.state.dialogForm.code,
      state: parseInt(this.state.dialogForm.state, 10),
    }));
  }

  updateDict = () => {
    this.props.dispatch(dictAction.actionUpdate({
      id: this.state.dialogForm.id,
      name: this.state.dialogForm.name,
      code: this.state.dialogForm.code,
      state: parseInt(this.state.dialogForm.state, 10),
    }));
  }

  deleteDict = () => {
    this.props.dispatch(dictAction.actionDelete({
      id: this.state.dialogForm.id,
    }));
  }

  addClick = () => {
    this.setState({ dialogTitle: '新增字典',
      addVisible: true,
      dialogForm: {
        name: '',
        code: '',
        state: '',
      }
    });
  }

  updateClick = (data) => {
    this.setState({
      dialogTitle: '修改字典',
      addVisible: true,
      dialogForm: {
        id: data.id,
        name: data.name,
        code: data.code,
        state: `${data.state}`,
      }
    });
  }

  deleteClick = (data) => {
    this.setState({
      deleteVisible: true,
      dialogForm: {
        id: data.id,
      }
    });
  }

  render() {
    console.log('----->', this.props.dictList);
    let height = 0;
    if (this.searchInput && this.addDiv && this.pagination) {
      height = this.props.pageHeight - this.searchInput.offsetHeight - this.addDiv.offsetHeight - this.pagination.offsetHeight - 16;
    }
    return (
      <div>
        {
          this.props.fetch && <Loading fullscreen />
        }
        <div
          ref={(refs) => { this.searchInput = refs; }}
          style={{ marginLeft: 16 }}
        >
          <SearchInput
            form={this.state.searchForm}
            onSearch={() => {
              this.setState((prev) => ({ isSearchForm: { ...prev.searchForm }, currentPage: 1 }), () => {
                this.listDict(1);
              });
            }}
            onReset={() => {
              this.setState({ searchForm: { name: '', code: '' }, isSearchForm: {}, currentPage: 1 }, () => {
                this.listDict(1);
              });
            }}
          >
            <Form.Item prop="name">
              <Input value={this.state.searchForm.name} placeholder="名称" onChange={(value) => { this.onChange('searchForm', 'name', value); }} />
            </Form.Item>
            <Form.Item prop="code">
              <Input value={this.state.searchForm.code} placeholder="代码" onChange={(value) => { this.onChange('searchForm', 'code', value); }} />
            </Form.Item>
            <Form.Item prop="state">
              <Select
                value={this.state.searchForm.state}
                placeholder="是否启用"
                onChange={(value) => { this.onChange('searchForm', 'state', value); }}
              >
                <Select.Option label="启用" value="1" />
                <Select.Option label="不启用" value="0" />
              </Select>
            </Form.Item>
            <Form.Item prop="createDate">
              <DatePicker
                placeholder="创建日期"
                value={this.state.searchForm.createDate}
                format="yyyy-MM-DD"
                onChange={(value) => { this.onChange('searchForm', 'createDate', value); }}
              />
            </Form.Item>
          </SearchInput>
        </div>
        <div
          style={{ marginBottom: 16, marginLeft: 16 }}
          ref={(refs) => { this.addDiv = refs; }}
        >
          <Button type="info" size="small" icon="plus" onClick={() => { this.addClick(); }}>新增</Button>
        </div>
        <TableView
          style={{ width: '100%' }}
          height={height}
          columns={[
            {
              label: '名称',
              prop: 'name',
            }, {
              label: '代码',
              prop: 'code',
            }, {
              label: '启用',
              prop: 'state',
              render: (data) => {
                if (data.state === 1) {
                  return <span>是</span>;
                }
                return <span>否</span>;
              }
            }, {
              label: '创建日期',
              prop: 'create_date',
              render: (data) => <span>{moment(data.create_date).format('yyyy-MM-DD HH:mm:ss')}</span>
            }, {
              label: '操作',
              prop: 'id',
              render: (data) => (
                <span>
                  <Button size="small" onClick={() => { this.updateClick(data); }}>修改</Button>
                  <Button size="small" type="danger" onClick={() => { this.deleteClick(data); }}>删除</Button>
                </span>
              )
            }
          ]}
          data={this.props.dictList.records && this.props.dictList.records}
          stripe
          border
        />
        <div ref={(refs) => { this.pagination = refs; }}>
          <Pagination
            layout="prev, pager, next"
            total={this.props.dictList.total}
            currentPage={this.state.currentPage}
            onCurrentChange={(page) => { this.setState({ currentPage: page }, () => { this.listDict(page); }); }}
          />
        </div>
        <DialogView
          title="删除字典"
          visible={this.state.deleteVisible}
          size="tiny"
          onSubmit={() => {
            this.deleteDict();
          }}
          onCancel={() => this.setState({ deleteVisible: false })}
        >
          <span>删除该项</span>
        </DialogView>
        <DialogView
          title={this.state.dialogTitle}
          visible={this.state.addVisible}
          size="tiny"
          onSubmit={() => {
            switch (this.state.dialogTitle) {
              case '新增字典':
                this.addDict();
                break;
              case '修改字典':
                this.updateDict();
                break;
              default:
            }
          }}
          onCancel={() => this.setState({ addVisible: false })}
        >
          <Form model={this.state.dialogForm} labelWidth="100">
            <Form.Item label="名称">
              <Input
                value={this.state.dialogForm.name}
                onChange={(value) => { this.onChange('dialogForm', 'name', value); }}
              />
            </Form.Item>
            <Form.Item label="代码">
              <Input
                value={this.state.dialogForm.code}
                onChange={(value) => { this.onChange('dialogForm', 'code', value); }}
              />
            </Form.Item>
            <Form.Item label="是否启用">
              <Select
                value={this.state.dialogForm.state}
                onChange={(value) => { this.onChange('dialogForm', 'state', value); }}
              >
                <Select.Option label="启用" value="1" />
                <Select.Option label="不启用" value="0" />
              </Select>
            </Form.Item>
          </Form>
        </DialogView>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dictList: dictSelect.listSelect(state),
  fetch: dictSelect.dictFetch(state),
  msg: dictSelect.dictMsg(state),
  err: dictSelect.dictErr(state),
  pageHeight: mainSelect.pageHeight(state),
});
export default connect(mapStateToProps)(Dict);
