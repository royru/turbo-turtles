console.log('hello')

function render(data: any) {
   const body = document.querySelector('body')
   body.innerHTML = '' // this will clean the body whenever it is run

   // TODO: Anastasia
   console.log(data)
}

async function fetchAndRender() {
   try {
      const raw = await fetch('https://turbo-turtles.vercel.app/api/data', {
         method: 'GET',
         mode: 'no-cors'
      })
      console.log(raw)
      const data = await raw.json()
      render(data)
   } catch (error) {
      console.error(error)
   }
}

async function main() {
   setInterval(fetchAndRender, 1000)
}

main()
