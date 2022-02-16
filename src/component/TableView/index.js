import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'element-react';

class TableView extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Table
          {...this.props}
        />
      </div>
    );
  }
}
export default TableView;
