'use strict';

import React from 'react';
import shell from 'shell';
import Editor from './MDEditor.js'
import marked from 'marked'

export class Main extends React.Component {
  state = {
    message: 'Hello, Electron'
  , code: '# Markdown Editor \n\n'
  }

  constructor () {
    super();
    this.openGithub = ::this.openGithub
    this.updateCode = ::this.updateCode
  }

  updateCode(newCode) {
    this.setState({ code: newCode })
  }

  openGithub () {
    shell.openExternal('https://github.com/Quramy/electron-jsx-babel-boilerplate');
  }
  render() {
    var preview = marked(this.state.code)

    return (
      <div className="container">
        <div className="content">
          <div className="editor">
            <Editor value={ this.state.code } onChange={ this.updateCode } />
          </div>
          <div className="preview" dangerouslySetInnerHTML={{ __html: preview }} />
        </div>

        <div className="divider"/>
        <div className="footer">
          <p>
            <img src="../assets/images/electron.svg" alt="" width="16px"></img>
            Provided by <a href="#" onClick={this.openGithub}>electron-jsx-babel-boilerplate</a> with <span className="glyphicon glyphicon-heart"></span>
          </p>
        </div>
      </div>
    );
  }
}
