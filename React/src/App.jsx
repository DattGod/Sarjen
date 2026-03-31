import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { tasks } from './data/tasks'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import StringConverter from './components/StringConverter'
import CharacterCounter from './components/CharacterCounter'
import CounterApp from './components/CounterApp'
import CountdownTimer from './components/CountdownTimer'
import PasswordToggle from './components/PasswordToggle'
import DigitalClock from './components/DigitalClock'
import GuessNumber from './components/GuessNumber'
import BasicCalculator from './components/BasicCalculator'
import FullCalculator from './components/FullCalculator'
import GSTCalculator from './components/GSTCalculator'
import TodoState from './components/TodoState'
import TodoLocalStorage from './components/TodoLocalStorage'
import TaskForm from './components/TaskForm'
import MultipleDataForm from './components/MultipleDataForm'
import UserCards from './components/UserCards'
import WeatherApp from './components/WeatherApp'
import CurrencyConverter from './components/CurrencyConverter'
import MovieSearch from './components/MovieSearch'
import NewsApp from './components/NewsApp'

function App() {
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [theme, setTheme] = useState('light') // Task-19: Theme state

  const selectedTask = tasks.find(task => task.id === Number(selectedTaskId))

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Task-19: Dynamic styles for theme
  const themeStyles = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
    color: theme === 'light' ? '#333333' : '#f0f0f0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s, color 0.3s'
  }

  return (
    <Router>
      <div style={themeStyles}>
        {/* Task-19: Theme Toggle UI */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: theme === 'light' ? '#333' : '#ddd',
              color: theme === 'light' ? '#fff' : '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>

        <select
          value={selectedTaskId || ''}
          onChange={(e) => setSelectedTaskId(e.target.value)}
          style={{ width: '300px', padding: '10px', marginBottom: '20px' }}
        >
          <option value="" disabled>-- Select a Task --</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>

        {selectedTask && (
          <div style={{ width: '100%', maxWidth: '800px', border: '1px border transparent', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Task-1 */}
            {selectedTaskId === "1" && (
              <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </div>
            )}

            {/* Task-2 */}
            {selectedTaskId === "2" && <StringConverter />}

            {/* Task-3 */}
            {selectedTaskId === "3" && <CharacterCounter />}


            {/* Task-4 */}
            {selectedTaskId === "4" && <CounterApp />}

            {/* Task-5 */}
            {selectedTaskId === "5" && <CountdownTimer />}

            {/* Task-6 */}
            {selectedTaskId === "6" && <PasswordToggle />}

            {/* Task-7 */}
            {selectedTaskId === "7" && <DigitalClock />}

            {/* Task-8 */}
            {selectedTaskId === "8" && <GuessNumber />}

            {/* Task-9 */}
            {selectedTaskId === "9" && <BasicCalculator />}

            {/* Task-10 */}
            {selectedTaskId === "10" && <FullCalculator />}

            {/* Task-11 */}
            {selectedTaskId === "11" && <GSTCalculator />}

            {/* Task-12 */}
            {selectedTaskId === "12" && (
              <div>
                <TodoState />
                <hr />
                <TodoLocalStorage />
                <hr />
                <TaskForm />
              </div>
            )}

            {/* Task-13 */}
            {selectedTaskId === "13" && <MultipleDataForm />}

            {/* Task-14 */}
            {selectedTaskId === "14" && <UserCards />}

            {/* Task-15 */}
            {selectedTaskId === "15" && <WeatherApp />}

            {/* Task-16 */}
            {selectedTaskId === "16" && <MovieSearch />}

            {/* Task-17 */}
            {selectedTaskId === "17" && <NewsApp />}

            {/* Task-18 */}
            {selectedTaskId === "18" && <CurrencyConverter />}

            {/* Task-19 */}
            {selectedTaskId === "19" && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2>Task 19: Dark/Light Mode</h2>
                <p>Use the global toggle button at the top of the page to switch styles!</p>
                <div style={{
                  marginTop: '20px',
                  padding: '50px',
                  border: theme === 'light' ? '2px dashed #333' : '2px dashed #ddd',
                  borderRadius: '15px'
                }}>
                  Current Mode: <strong style={{ textTransform: 'uppercase' }}>{theme}</strong>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </Router>
  )
}

export default App
