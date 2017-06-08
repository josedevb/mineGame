let fs = require('fs')
let input = fs.readFileSync('mines.in','utf8')
let acum = 1
for(let i = 0; i < input.length; i++) {
  for(let j = 0; j < input.length; j++) {
     if( typeof input[i][j] == 'number' ) {
        input[i][j] = 'Campo ' + acum
     }
  }
  acum++
}
console.log(input)
let board = []
input.split('\r\n').forEach((e)=> {
    board.push(e.split(''))
})

function mineSwiper(board, opts={}) {
  opts = Object.assign({
    mineChar: '*'
  }, opts)

 let boardSwiped = board.map((row, x)=>{
    return row.map((item, y)=>{
      let mineCount = mineCounter(board, x, y, opts.mineChar)
      if (mineCount >= 0) return mineCount.toString()
      return opts.mineChar
    })
  })

  return formatOutput(boardSwiped)
}

function formatOutput(finalBoard) {
    let output = ''
    for(row in finalBoard) {
      let elem = finalBoard[row].join('')
        output += elem + '\n'
    }
    return output
}

function mineCounter(board, x, y, mineChar='*'){
  var ady = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
  ]
  let c = board[x][y]
  let count = 0
  if (c !== mineChar) {
    for (let i = 0; i < ady.length; i++) {
      let dx = ady[i][0]
      let dy = ady[i][1]
      let x2 = x + dx
      let y2 = y + dy
      if (x2 < 0 || y2 < 0) continue
      if(x2 >= board.length || y2 >= board[0].length) continue
      let item = board[x2][y2]
      if (item == mineChar) count++
    }
    return count
  }  
  return -1  
}

//console.log(mineSwiper(board))