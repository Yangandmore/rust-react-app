import React from 'react';
import { Tabs } from 'element-react';

class TabsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Tabs type="card" closable activeName="1" />
    );
  }
}
export default TabsView;
