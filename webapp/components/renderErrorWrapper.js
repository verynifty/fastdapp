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
    this.state.hasError = false;
    /*
    if (prevProps.version !== this.props.version) {
    }
    */
  }

  render() {
    // Check if the error is thrown
    console.log(this.state.error)
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <section class="w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
          <h1 class="text-3xl font-bold text-primary mb-4">Oops! An error occurred.</h1>
          <div class="w-full max-w-xs md:max-w-md bg-neutral p-4 mb-4 overflow-auto">
            <pre class="text-sm font-mono rounded  p-4 ">
              <code>{this.state.error != null ? this.state.error.message : ""} </code>
            </pre>
          </div>
          <div class="mt-6">
            Need help?
          </div>
          <a
            class="btn btn-primary mt-4"
            href="https://t.me/grands_marquis"
            target='_blank'
          >Chat with a dev on Telegram</a>
        </section>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default RenderErrorWrapper