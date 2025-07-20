import { Component } from 'react';

class Crash extends Component<{ shouldCrash?: boolean }> {
  componentDidMount() {
    if (this.props.shouldCrash) {
      throw new Error('User triggered error');
    }
  }

  render() {
    return this.props.shouldCrash ? null : <div>Component did not crash</div>;
  }
}

export default Crash;
