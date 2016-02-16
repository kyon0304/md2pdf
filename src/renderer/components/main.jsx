'use strict';

import React from 'react';
import shell from 'shell';
import Editor from './MDEditor.js'
import marked from 'marked'
import jsPDF from '../../../bower_components/jspdf'

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
      , pdf = new jsPDF('p', 'pt', 'letter')
      , margins = { top: 80, bottom: 60, left: 40, width: 522 }

    var savePDF = function () {
      pdf.fromHTML(preview, margins.left, margins.top, { 'width': margins.width },
                   function() { pdf.save("test.pdf") }, margins)
                   //() => pdf.save("test.pdf"), margins)
    }

    return (
      <div className="container">
        <div className="content">
          <div className="editor">
            <Editor value={ this.state.code } onChange={ this.updateCode } />
            <button className="save" onClick={ savePDF }>Download PDF</button>
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
