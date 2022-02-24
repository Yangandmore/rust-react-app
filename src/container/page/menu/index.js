import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Layout, Form, Input, Button, Select, DatePicker, Loading, Message, Pagination, Tree, InputNumber, Cascader } from 'element-react';
import { SearchInput, TableView, DialogView } from '../../../component';
import { mainSelect, menuAction, menuSelect } from '../../../redux';
import { StringUtils } from '../../../utils';

class Menu extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    menuList: PropTypes.object.isRequired,
    fetch: PropTypes.bool,
    msg: PropTypes.string,
    err: PropTypes.string,
    pageHeight: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      addVisible: false,
      deleteVisible: false,
      dialogTitle: '',
      dialogForm: {
        name: '',
        route_name: '',
        parent_id: '',
        sort: 0
      },
      cascaderData: [],
      nodes: {}
    };
  }

  componentDidMount() {
    this.listMenu();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let res = { fetch: nextProps.fetch };
    if (prevState.fetch && !nextProps.fetch) {
      res = {
        addVisible: false,
        deleteVisible: false,
        dialogForm: {
          name: '',
          route_name: '',
          parent_id: '',
          sort: 0
        },
        cascaderData: [],
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
      this.listMenu();
    }
  }

  onChange(data, key, value) {
    this.setState((prev) => ({
      [data]: { ...prev.[data], [key]: value }
    }));
  }

  listMenu = () => {
    this.props.dispatch(menuAction.actionList({}));
  }

  addMenu = () => {
    this.props.dispatch(menuAction.actionAdd({
      name: this.state.dialogForm.name,
      route_name: this.state.dialogForm.route_name,
      parent_id: this.state.dialogForm.parent_id,
      sort: this.state.dialogForm.sort,
    }));
  }

  updateMenu = () => {
    this.props.dispatch(menuAction.actionUpdate({
      id: this.state.dialogForm.id,
      name: this.state.dialogForm.name,
      route_name: this.state.dialogForm.route_name,
      parent_id: this.state.dialogForm.parent_id,
      sort: this.state.dialogForm.sort,
    }));
  }

  deleteMenu = () => {
    this.props.dispatch(menuAction.actionDelete({
      id: this.state.dialogForm.id
    }));
  }

  addClick = () => {
    this.setState((prev) => ({
      dialogTitle: '新增菜单',
      addVisible: true,
      dialogForm: {
        name: '',
        route_name: '',
        parent_id: '',
        sort: 0
      }
    }));
  }

  updateClick = () => {
    if (!this.state.nodes.id) {
      Message({
        message: '请选择要修改的菜单!',
        type: 'warning'
      });
      return;
    }
    this.setState((prev) => ({
      dialogTitle: '修改菜单',
      addVisible: true,
      dialogForm: {
        id: prev.nodes.id,
        name: prev.nodes.name,
        route_name: prev.nodes.route_name,
        parent_id: prev.nodes.parent_id,
        sort: prev.nodes.sort
      },
      cascaderData: [prev.nodes.parent_id]
    }));
  }

  deleteClick = (data) => {
    if (!this.state.nodes.id) {
      Message({
        message: '请选择要删除的菜单!',
        type: 'warning'
      });
      return;
    }
    this.setState((prev) => ({
      deleteVisible: true,
      dialogForm: {
        id: prev.nodes.id,
      }
    }));
  }

  getParentObj = (parentId, arrays) => {
    if (parentId === '' || parentId === null) return null;
    for (const index in arrays) {
      const data = arrays[index];
      if (parentId === data.id) {
        return data;
      }
      if (data.children.length > 0) {
        const d = this.getParentObj(parentId, data.children);
        if (d !== null) {
          return d;
        }
      }
    }
    return null;
  }

  render() {
    let list = [];
    if (this.props.menuList.records) {
      list = this.props.menuList.records;
    }
    let letfHeight = 0;
    let rightHeight = 0;
    if (this.addDiv) {
      letfHeight = this.props.pageHeight - this.addDiv.offsetHeight - 24;
      rightHeight = this.props.pageHeight - 16;
    }
    return (
      <div>
        {
          this.props.fetch && <Loading fullscreen />
        }
        <div style={{ margin: 8 }}>
          <Layout.Row>
            <Layout.Col span="8">
              <div style={{ marginRight: 8 }}>
                <div
                  ref={(refs) => { this.addDiv = refs; }}
                  style={{ marginBottom: 8 }}
                >
                  <Button type="info" size="small" icon="plus" onClick={() => { this.addClick(); }}>新增</Button>
                  <Button type="warning" size="small" icon="edit" onClick={() => { this.updateClick(); }}>修改</Button>
                  <Button type="danger" size="small" icon="delete" onClick={() => { this.deleteClick(); }}>删除</Button>
                </div>
                <Tree
                  style={{ height: letfHeight }}
                  data={list}
                  nodeKey="id"
                  defaultExpandAll
                  expandOnClickNode={false}
                  options={{
                    children: 'children',
                    label: 'name'
                  }}
                  onNodeClicked={(node) => {
                    console.log(node);
                    this.setState({ nodes: node });
                  }}
                  highlightCurrent
                />
              </div>
            </Layout.Col>
            <Layout.Col span="16">
              <div style={{ marginLeft: 8 }}>
                <TableView
                  style={{ width: '100%' }}
                  height={rightHeight}
                  columns={[
                    {
                      label: '名称',
                      prop: 'name'
                    }, {
                      label: '路由',
                      prop: 'route_name'
                    }, {
                      label: '排序',
                      prop: 'sort'
                    }, {
                      label: '创建日期',
                      prop: 'create_date',
                      render: (data) => <span>{moment(data.create_date).format('yyyy-MM-DD HH:mm:ss')}</span>
                    }
                  ]}
                  data={this.state.nodes.children}
                />
              </div>
            </Layout.Col>
          </Layout.Row>
        </div>
        <DialogView
          title="删除菜单"
          visible={this.state.deleteVisible}
          size="tiny"
          onSubmit={() => {
            this.deleteMenu();
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
              case '新增菜单':
                this.addMenu();
                break;
              case '修改菜单':
                this.updateMenu();
                break;
              default:
            }
          }}
          onCancel={() => this.setState({ addVisible: false, cascaderData: [] })}
        >
          <Form model={this.state.dialogForm} labelWidth="100">
            <Form.Item label="名称">
              <Input
                value={this.state.dialogForm.name}
                onChange={(value) => { this.onChange('dialogForm', 'name', value); }}
              />
            </Form.Item>
            <Form.Item label="路由">
              <Input
                value={this.state.dialogForm.route_name}
                onChange={(value) => { this.onChange('dialogForm', 'route_name', value); }}
              />
            </Form.Item>
            <Form.Item label="父菜单">
              <Input
                disabled
                placeholder={
                  this.state.cascaderData.length > 0
                    ? this.getParentObj(this.state.cascaderData[this.state.cascaderData.length - 1], this.props.menuList.records).name : ''
                }
              />
              <div style={{ height: 8 }} />
              <Cascader
                options={list}
                props={{
                  label: 'name',
                  value: 'id'
                }}
                value={this.state.cascaderData}
                changeOnSelect
                onChange={(value) => {
                  this.setState((prev) => ({
                    dialogForm: {
                      parent_id: value[value.length - 1].id,
                      ...prev.dialogForm
                    },
                    cascaderData: value
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="排序">
              <InputNumber
                defaultValue={this.state.dialogForm.sort}
                onChange={(value) => { this.onChange('dialogForm', 'sort', value); }}
                min="1"
                max="999"
              />
            </Form.Item>
          </Form>
        </DialogView>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  menuList: menuSelect.listSelect(state),
  fetch: menuSelect.menuFetch(state),
  msg: menuSelect.menuMsg(state),
  err: menuSelect.menuErr(state),
  pageHeight: mainSelect.pageHeight(state),
});
export default connect(mapStateToProps)(Menu);
