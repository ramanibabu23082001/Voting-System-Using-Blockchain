import React from "react";
import Webcam from "react-webcam";
class Web extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          screenshot: null,
          tab: 0
        };
      }

      handleClick = () => {
        const screenshot = this.webcam.getScreenshot();
        this.setState({ screenshot });
        
      }
    
      render() {
        return (
          <div>
            <h1>Webcam image capture thala !!!</h1>
            <Webcam
              audio={false}
              ref={node => this.webcam = node}
            />

            <div>
              <h2>Screenshots</h2>
              <div className='screenshots'>
                <div className='controls'>
                  
                  <button onClick={this.handleClick}>capture</button>
                  
                </div>
                 <img src={this.state.screenshot} />
                 
              </div>
            </div>
          </div>
        );
      }
    }
export default Web;