import React, { Component } from "react";

export default class Nav extends Component {
  render() {
    return (
      <header id="main-header">
        <div className="content">
          <img src="./assets/logo.svg" />
          <div>
            <div>Meu Perfil</div>
            <img src="./assets/notifications.svg" />
          </div>
        </div>
      </header>
    );
  }
}
