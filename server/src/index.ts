var render_count = 0
var raceTrackWidth = 1000
var winner = ''

var total_steps_per_user: { [key: number]: number } = {
   1: 0,
   2: 0,
   3: 0,
   4: 0,
   5: 0
}

var color_defs = {
   green: {
      path_color: '#F2FBB9'
   },
   blue: {
      path_color: '#E6F5FF'
   },
   purple: {
      path_color: '#EED5F9'
   },
   pink: {
      path_color: '#FDD8E4'
   },
   orange: {
      path_color: '#FFE2B4'
   }
}

function isThereAWinner() {
   let maxScore = 0

   for (let userId in total_steps_per_user) {
      if (total_steps_per_user.hasOwnProperty(userId)) {
         maxScore = Math.max(maxScore, total_steps_per_user[userId])
         if (maxScore == total_steps_per_user[userId]) {
            winner = userId
         }
      }
   }
   if (maxScore >= raceTrackWidth) {
      return true
   } else return false
}

console.log('hello')

function render(data: any) {
   const body = document.querySelector('body')
   body.style.fontFamily = 'Trebuchet MS'
   body.innerHTML = '' // this will clean the body whenever it is run

   console.log(data)
   const title = document.createElement('h1')
   if (isThereAWinner()) {
      console.log('There is a winner!')
      console.log(`The winning ID is ${winner}`)
      console.log(``)
      // console.log(`Winning turtle object ${data[parseInt(winner)]}`)
      const winnerId = parseInt(winner)
      const winningTurtle = data.find(
         (u: { id: number; name: string; steps: number; color: string }) =>
            u.id === winnerId
      )
      const winningTurtleName = winningTurtle.name

      // const user = data.find(u => u.id === parseInt(winner))
      console.log(`Winning turtle object ${winningTurtle}`)

      if (winningTurtleName) {
         console.log('User found:', winningTurtleName)
      } else {
         console.log(`User with ID ${winnerId} not found.`)
      }
      // console.log(`Winning turtle name ${data[parseInt(winner)].name}`)
      // const winnerTurtle = data[parseInt(winner)].name
      title.textContent = `${winningTurtleName} won the race!`
   } else {
      title.textContent = `Turbo Turtles!`
   }
   body.appendChild(title)

   for (let user of data) {
      const user_name = user.name
      const user_color: 'green' | 'blue' | 'purple' | 'pink' | 'orange' =
         user.color
      const user_id: 1 | 2 | 3 | 4 | 5 = user.id
      const user_steps = total_steps_per_user[user_id]
      // const user_steps = user.steps
      const user_steps_px = `${user_steps * 1}px`
      const user_path_color = color_defs[user_color].path_color
      const left_or_right: string = render_count % 2 === 0 ? '0' : '1'
      const turtle_img_path = `assets/${user_color}_turtle_${left_or_right}.svg`

      // .race-track
      const race = document.createElement('div')
      race.className = 'race-track'
      race.style.width = `${raceTrackWidth}px`
      body.appendChild(race)

      // .progress-bar
      const progress = document.createElement('div')
      progress.className = 'progress-bar'
      progress.style.width = '100%'
      progress.style.backgroundColor = '#e0e0e0'
      progress.style.borderRadius = '5px'
      progress.style.overflow = 'hidden'
      progress.style.position = 'relative'
      race.appendChild(progress)

      // .progress
      const progressInner = document.createElement('div')
      progressInner.className = 'progress'
      progressInner.style.width = user_steps_px
      progressInner.style.height = '40px'
      progressInner.style.borderRadius = '5x'
      progressInner.style.position = 'relative'
      progressInner.style.color = '#2f2f2f'
      progressInner.style.lineHeight = '20px'
      progressInner.style.textAlign = 'left'
      progressInner.style.paddingLeft = '5px'
      progressInner.style.backgroundColor = user_path_color
      progressInner.textContent = user_name
      progress.appendChild(progressInner)

      const verticalLine = document.createElement('div')
      verticalLine.className = 'vertical-line'
      verticalLine.style.width = '2px'
      verticalLine.style.height = '100%'
      verticalLine.style.backgroundColor = 'black'
      verticalLine.style.position = 'absolute'
      verticalLine.style.right = '0'
      progress.appendChild(verticalLine)

      const imgTurtle = document.createElement('img')
      imgTurtle.className = 'img.turtle'
      imgTurtle.style.height = '40px'
      imgTurtle.style.left = user_steps_px
      imgTurtle.style.position = 'absolute'
      imgTurtle.style.top = '0'
      imgTurtle.style.transform = 'translateX(-50%)'
      imgTurtle.src = turtle_img_path
      progress.appendChild(imgTurtle)
   }
}

async function fetchAndRender() {
   try {
      render_count += 1

      if (!isThereAWinner()) {
         for (let userId in total_steps_per_user) {
            if (total_steps_per_user.hasOwnProperty(userId)) {
               // Use bracket notation with a type assertion
               total_steps_per_user[parseInt(userId)] += Math.floor(
                  Math.random() * 200
               )
            }
         }
      }

      // const raw = await fetch(
      //    'https://turbo-turtles-edge.vercel.app/api/data',
      //    {
      //       method: 'GET',
      //       mode: 'cors'
      //    }
      // )
      // const data = await raw.json()
      // console.log(data)

      type User = {
         id: number
         name: string
         steps: number
         color: string
      }

      const data: User[] = [
         { id: 1, name: 'Roy', steps: 5, color: 'green' },
         { id: 2, name: 'Anastasia', steps: 10, color: 'blue' },
         { id: 3, name: 'Sheena', steps: 15, color: 'purple' },
         { id: 4, name: 'Tarek', steps: 20, color: 'pink' },
         { id: 5, name: 'Sebastian', steps: 25, color: 'orange' }
      ]

      // const data = [
      //    { id: 1, name: 'Roy', steps: 5, color: 'green' },
      //    { id: 2, name: 'Anastasia', steps: 10, color: 'blue' },
      //    { id: 3, name: 'Sheena', steps: 15, color: 'purple' },
      //    { id: 4, name: 'Tarek', steps: 20, color: 'pink' },
      //    { id: 5, name: 'Sebastian', steps: 25, color: 'orange' }
      // ]
      render(data)
   } catch (error) {
      console.error(error)
   }
}

async function main() {
   setInterval(fetchAndRender, 1500)
}

main()
