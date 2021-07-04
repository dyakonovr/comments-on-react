import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

let myStorage = window.localStorage;

let textObj = {};
let parseObj = [];

parseArray();

class CreateComment extends React.Component {
  constructor() {
    super();

    this.state = {
      commArr: []
    }

    if (parseObj.length != 0) {
      for (let el in Object.keys(parseObj)) {
        let currKey = Object.keys(parseObj)[el];
        let m = {};
        m[currKey] = parseObj[Object.keys(parseObj)[el]];
        this.state.commArr.push(m);
      }
    }

    this.newComment = this.newComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  newComment() {
    let input = document.querySelector('.input');
    let textarea = document.querySelector('.textarea');

    let uname = input.value;
    let utext = textarea.value;

    if (uname.trim() == '' || utext.trim() == '') {
      input.classList.add('error');
      textarea.classList.add('error');
    }

    else {
      input.classList.remove('error');
      textarea.classList.remove('error');

      let arr = this.state.commArr;
      let date = getDate();

      let obj = {};
      obj[uname] = {
        "text": utext,
        "date": date
      }
      arr.push(obj);
      this.setState({ arr });

      parseArray();
      (parseObj == null) ? textObj = {} : textObj = parseObj;

      textObj[uname] = {
        "text": utext,
        "date": date
      };

      addItem('comments', JSON.stringify(textObj));

      document.querySelector('.input').value = '';
      document.querySelector('.textarea').value = '';
    }
  }

  deleteComment(event) {
    let btn = event.currentTarget;
    let parent = btn.parentElement.parentElement;
    parent.remove();
    let name = parent.querySelector('.upper').querySelector('.author').textContent;
    parseArray();
    textObj = parseObj;
    delete textObj[name];
    myStorage.setItem('comments', JSON.stringify(textObj));
  }

  render() {
    return (
      <div class="comments">
        <ul class="list">
          {
            this.state.commArr.map((c, i) => {
              let name = Object.keys(this.state.commArr[i]);
              return (
                <li className="item" key={i}>
                  <div className="upper">
                    <strong className="author">{name}</strong>
                    <button className="close" onClick={this.deleteComment}></button>
                  </div>
                  <div className="lower">
                    <p className="text">{this.state.commArr[i][name].text}</p>
                    <span className="data">{this.state.commArr[i][name].date}</span>
                  </div>
                </li>
              );
              // }
            })
          }
        </ul>
        <form action="POST" className="form">
          <h2 className="title">Добавить комментарий</h2>
          <input type="text" name="author" className="input" placeholder="Введите ваше имя" />
          <textarea type="text" className="textarea" name="text" placeholder="Введите ваш комментарий"></textarea>
          <button className="submit" type="button" onClick={this.newComment}>Добавить</button>
        </form>
      </div>
    );
  }
}

function addItem(key, value) {
  myStorage.setItem(key, value);
}

function getDate() {
  return new Intl.DateTimeFormat("ru", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).format(new Date());
};

function parseArray() {
  parseObj = myStorage.getItem('comments');
  parseObj = JSON.parse(parseObj);
}

ReactDOM.render(
  <CreateComment />,
  document.querySelector('body')
)