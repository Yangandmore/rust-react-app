import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('-----> home cmd');
  }

  componentWillUnmount() {
    console.log('-----> home unm');
  }

  render() {
    return (<div>home</div>);
  }
}
export default Home;
