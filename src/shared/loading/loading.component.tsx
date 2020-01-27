import React, { Component } from 'react';
import loading from '../../styles/animation/loading.gif';
import './loading.css';


interface Props { }

interface State { }


class LoadingComponent extends Component<Props,State> {

  render() {
    return (
      <>
        <img 
          className="loading-img" 
          src={ loading } 
          alt="loading img" 
        />
      </>
    );
  }

}

export default LoadingComponent;