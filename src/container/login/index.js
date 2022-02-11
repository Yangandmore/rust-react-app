import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Form, Item, Input, Button } from 'element-react';
import styles from './styles';
import { mainAction, mainSelect } from '../../redux';

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const res = {};
    console.log('----->');
    return res;
  }

  apiTest = () => {
    this.props.dispatch(mainAction.actionApiTest());
  };

  localTest = () => {
    console.log('-----local');
    this.props.dispatch(mainAction.actionLocalTest({ a: 1, b: 2 }));
  };

  onChange = (key, value) => {
    this.setState((prev) => ({
      loginForm: { ...prev.loginForm, [key]: value }
    }));
  }

  onLogin = (e) => {
    e.preventDefault();
    this.form.validate((valid) => {
      if (valid) {
        // TODO 登录
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <Layout.Row gutter="20">
        <Layout.Col>
          <div style={{ marginTop: 100 }} />
        </Layout.Col>
        <Layout.Col>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <h1>Demo</h1>
          </div>
        </Layout.Col>
        <Layout.Col span="5" offset="9">
          <div style={{ marginTop: 36 }}>
            <Form
              ref={(refs) => { this.form = refs; }}
              model={this.state.loginForm}
              rules={this.state.loginRules}
              labelWidth="80"
            >
              <Form.Item label="用户名" prop="username">
                <Input value={this.state.loginForm.username} onChange={(value) => { this.onChange('username', value); }} />
              </Form.Item>
              <Form.Item label="密码" prop="password">
                <Input type="password" value={this.state.loginForm.password} onChange={(value) => { this.onChange('password', value); }} />
              </Form.Item>
              <Form.Item>
                {/* TODO 自动登录忘记密码 */}
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.onLogin}>登录</Button>
              </Form.Item>
              {/* TODO 其他登录注册账户 */}
            </Form>
          </div>
        </Layout.Col>
      </Layout.Row>
    );
  }
}

const mapStateToProps = (state) => ({
  data: mainSelect.dataSelect(state),
});
export default connect(mapStateToProps)(Login);
