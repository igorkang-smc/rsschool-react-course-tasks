import { Component } from 'react';

class Crash extends Component {
  render() {
    throw new Error('User triggered error');
    return null;
  }
}

export default Crash;
