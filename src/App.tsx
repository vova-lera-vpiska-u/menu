import './App.css'
import { menu } from './database/bd'

function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {menu.map((dish) => (
        <div key={dish.name} style={{border: '1px solid white', padding: '10px', }}>
          <h1>{dish.name}</h1>
          <h3>{dish.category}</h3>
          <h2>{dish.description}</h2>
          <ul>
            {dish.ingredients.map((ingridient) => (
              <li key={ingridient.ingridient.name}>
                {ingridient.ingridient.name} - {ingridient.amount}
              </li>
            ))}
          </ul>
          <p>{dish.recipe}</p>
          <img src={dish.image} alt={dish.name} style={{maxWidth: '100%'}}/>

        </div>
      ))}
    </div>
  )
}

export default App
