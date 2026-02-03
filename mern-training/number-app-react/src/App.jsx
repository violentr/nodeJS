
import NumberApp from './NumberApp';

/* practice tailwindcss */

import Practice from './Practice';

function App() {
  const practice = import.meta.env.VITE_PRACTICE === 'true'


  return (
    <div>
      { practice ? <Practice /> : <NumberApp />}
    </div>
  )

}

export default App
