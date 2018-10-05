// @flow
import React, { forwardRef, Component } from 'react';
import { FacebookContext } from './FacebookProvider';

type Props = {
  children: Function,
  onReady?: Function,
  handleInit: Function,
  isReady: boolean,
  api?: Object,
};

class Initialize extends Component<Props> {
  static defaultProps = {
    onReady: undefined,
    api: undefined,
  };

  componentDidMount() {
    this.prepare();
  }

  async prepare() {
    const { onReady, handleInit } = this.props;
    const api = await handleInit();
    if (onReady) {
      onReady(api);
    }
  }

  render() {
    const { children, isReady, api } = this.props;

    const childrenProps = {
      isReady,
      api,
    };

    if (typeof children === 'function') {
      return children(childrenProps);
    }

    return children;
  }
}

export default forwardRef((props, ref) => (
  <FacebookContext.Consumer>
    {({ handleInit, isReady, api }) => (
      <Initialize
        {...props}
        handleInit={handleInit}
        isReady={isReady}
        api={api}
        ref={ref}
      />
    )}
  </FacebookContext.Consumer>
));
