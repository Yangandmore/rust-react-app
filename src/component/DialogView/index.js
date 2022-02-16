import React from 'react';
import { Dialog, Button } from 'element-react';
import PropTypes from 'prop-types';

class DialogView extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Dialog {...this.props}>
        <Dialog.Body>
          {this.props.children}
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={() => { this.props.onCancel(); }}>取消</Button>
          <Button type="primary" onClick={() => { this.props.onSubmit(); }}>确定</Button>
        </Dialog.Footer>
      </Dialog>
    );
  }
}
export default DialogView;
