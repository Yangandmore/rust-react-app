import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'element-react';

class SearchInput extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  onSearch = () => {
    this.props.onSearch();
  }

  onReset = () => {
    this.props.onReset();
  }

  render() {
    return (
      <Form
        inline
        model={this.props.form}
        ref={(refs) => { this.form = refs; }}
      >
        {this.props.children}
        <Form.Item>
          <Button size="small" type="primary" onClick={this.onSearch}>搜索</Button>
          <Button size="small" onClick={this.onReset}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}
export default SearchInput;
