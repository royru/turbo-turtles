console.log('hello')

function render(data: any) {
   const body = document.querySelector('body')
   body.innerHTML = '' // this will clean the body whenever it is run

   // TODO: Anastasia
   console.log(data)
   const span = document.createElement('span')
   span.innerText = 'Hello World'

   for (let user of data) {
      // .race-track
      const race = document.createElement('div')
      race.className = 'race-track'
      body.appendChild(race)

      // .progress-bar
      const progress = document.createElement('div')
      progress.className = 'progress-bar'
      body.appendChild(progress)

      // .progress
      const progressInner = document.createElement('img')
      progressInner.className = 'progress'
      progressInner.style.width = `${user.steps * 10}px`
      progress.appendChild(progressInner)
   }
}

async function fetchAndRender() {
   try {
      // const raw = await fetch('https://turbo-turtles.vercel.app/api/data', {
      //    method: 'GET',
      //    mode: 'no-cors'
      // })
      // console.log(raw)
      // const data = await raw.json()
      const data = [
         { name: 'roy', steps: 5, color: 'red' },
         { name: 'anastasia', steps: 10, color: 'blue' },
         { name: 'sheena', steps: 15, color: 'green' }
      ]
      render(data)
   } catch (error) {
      console.error(error)
   }
}

async function main() {
   setInterval(fetchAndRender, 10000)
}

main()
