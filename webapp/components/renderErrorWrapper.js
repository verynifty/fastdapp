import { default as React } from 'react';

class RenderErrorWrapper extends React.Component {
    constructor(props) {
      super(props)
   
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false, error: null, errorInfo: null }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
        
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
      this.state.error = error;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.version !== this.props.version) {
            this.state.hasError = false;
        }
      }

    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div>
            <h2>Oops, there is an error!</h2>
              {this.state.error != null ? this.state.error.toString() : ""}
          </div>
        )
      }
   
      // Return children components in case of no error
   
      return this.props.children
    }
  }
   
  export default RenderErrorWrapper