import React from 'react';
import { Layout, Menu } from 'element-react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ backgroundColor: '#EEF1F6' }}>
        <Layout.Row type="flex" justify="end">
          <Layout.Col span="6">
            <Menu defaultActive="1" className="el-menu-demo" mode="horizontal">
              <Menu.Item index="1">消息</Menu.Item>
              <Menu.SubMenu index="2" title="我的工作台">
                <Menu.Item index="2-1">选项1</Menu.Item>
                <Menu.Item index="2-2">选项2</Menu.Item>
                <Menu.Item index="2-3">选项3</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu index="3" title="我的" />
              <Menu.Item index="4">退出</Menu.Item>
            </Menu>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
export default Header;
