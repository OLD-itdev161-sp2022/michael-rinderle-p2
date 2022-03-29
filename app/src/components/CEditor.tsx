import React, { Fragment } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';
import styled from 'styled-components'
import axios from 'axios';

class CEditor extends React.Component
{
  state = {
    code: `#include <stdio.h>\n\nint main() {\n    printf("hello from online c compiler!");\n    return 0;\n}`,
    output: ``
  }

  EditorContainer = styled.div`
      padding-left: 15%;
      padding-right: 15%;
  `
  CompileButton = styled.button`
      margin-top: 1.5em;
  `;

  CodeOutput = styled.p`
    font-size: .75em;
    white-space: pre-line;
    background-color: black;
    color: white;
    margin: .25em;
  `

  compileCode() {
    axios.post(`http://localhost:5000/compile`, 
      {
        code: this.state.code
      })
      .then((response) => {
        this.setState({output: response.data}); 
        
        axios({
          method: `GET`,
          url: `http://localhost:5000/download`,
          responseType: `blob`
        }). then((response) => {
          var headers = response.headers;
          var blob = new Blob([response.data],{type:headers['content-type']});
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = "output.exe";
          link.click();
        });
      })
      .catch((error) => {
        this.setState({output: `Error compiling`});
      });   
  }

  render() {
    return(
      <Fragment>
        <this.EditorContainer>
          <h2>Editor</h2>
          <p>Enter some c code and compile for the output</p>
          <CodeEditor
            value={this.state.code}
            language="c"
            placeholder="Please enter C code."
            onChange={(evn) => this.setState({code : evn.target.value})}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
          <this.CompileButton onClick={() => this.compileCode()}>Compile Code</this.CompileButton>
          { this.state.output !== "" && 
            <div>
              <h2>Compilation Output</h2>
              <this.CodeOutput>{this.state.output}</this.CodeOutput>
            </div>
          }
        </this.EditorContainer>
      </Fragment>
    )
  }
}

export default CEditor;