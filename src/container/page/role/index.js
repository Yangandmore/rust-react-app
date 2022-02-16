import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, DatePicker, Loading, Message, Pagination } from 'element-react';
import { SearchInput, TableView, DialogView } from '../../../component';
import { mainSelect, roleAction, roleSelect } from '../../../redux';
import { StringUtils } from '../../../utils';

class Role extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    roleList: PropTypes.object.isRequired,
    fetch: PropTypes.bool,
    msg: PropTypes.string,
    err: PropTypes.string,
    pageHeight: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      searchForm: {
        name: '',
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
      }
    };
  }

  componentDidMount() {
    this.listRole(this.state.currentPage);
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

  onChange(data, key, value) {
    this.setState((prev) => ({
      [data]: { ...prev.[data], [key]: value }
    }));
  }

  listRole = (pageIndex) => {
    this.props.dispatch(roleAction.actionList({
      page_index: pageIndex,
      page_count: this.state.pageCount,
      name: StringUtils.isEmpty(this.state.isSearchForm.name) ? null : this.state.isSearchForm.name,
    }));
  }

  addRole = () => {
    this.props.dispatch(roleAction.actionAdd({
      name: this.state.dialogForm.name,
    }));
  }

  updateRole = () => {
    this.props.dispatch(roleAction.actionUpdate({
      id: this.state.dialogForm.id,
      name: this.state.dialogForm.name,
    }));
  }

  deleteRole = () => {
    this.props.dispatch(roleAction.actionDelete({
      id: this.state.dialogForm.id,
    }));
  }

  addClick = () => {
    this.setState({ dialogTitle: '新增角色',
      addVisible: true,
      dialogForm: {
        name: '',
      }
    });
  }

  updateClick = (data) => {
    this.setState({
      dialogTitle: '修改角色',
      addVisible: true,
      dialogForm: {
        id: data.id,
        name: data.name,
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
    console.log('----->', this.props.roleList);
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
                this.listRole(1);
              });
            }}
            onReset={() => {
              this.setState({ searchForm: { name: '' }, isSearchForm: {}, currentPage: 1 }, () => {
                this.listRole(1);
              });
            }}
          >
            <Form.Item prop="name">
              <Input value={this.state.searchForm.name} placeholder="名称" onChange={(value) => { this.onChange('searchForm', 'name', value); }} />
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
          data={this.props.roleList.records && this.props.roleList.records}
          stripe
          border
        />
        <div ref={(refs) => { this.pagination = refs; }}>
          <Pagination
            layout="prev, pager, next"
            total={this.props.roleList.total}
            currentPage={this.state.currentPage}
            onCurrentChange={(page) => { this.setState({ currentPage: page }, () => { this.listRole(page); }); }}
          />
        </div>
        <DialogView
          title="删除角色"
          visible={this.state.deleteVisible}
          size="tiny"
          onSubmit={() => {
            this.deleteRole();
          }}
          onCancel={() => this.setState({ deleteVisible: false })}
        >
          <span>删除改项</span>
        </DialogView>
        <DialogView
          title={this.state.dialogTitle}
          visible={this.state.addVisible}
          size="tiny"
          onSubmit={() => {
            switch (this.state.dialogTitle) {
              case '新增角色':
                this.addRole();
                break;
              case '修改角色':
                this.updateRole();
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
          </Form>
        </DialogView>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  roleList: roleSelect.listSelect(state),
  fetch: roleSelect.roleFetch(state),
  msg: roleSelect.roleMsg(state),
  err: roleSelect.roleErr(state),
  pageHeight: mainSelect.pageHeight(state),
});
export default connect(mapStateToProps)(Role);
