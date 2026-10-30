const newsList = [
  { id: 1, title: "В Міноборони заявили про відновлення роботи Starshield у русі на фронті - джерела", author: "Мудрий Антон", length: 150, day1Reads: 120, day2Reads: 140, publishTime: new Date(2026, 9, 1, 11, 15)},
  { id: 2, title: "У Вірменії почали процедуру націоналізації енергокомпанії російського олігарха", author: "Міхопарова Кіра", length: 300, day1Reads: 450, day2Reads: 500, publishTime: new Date(2026, 9, 1, 19, 40)},
  { id: 3, title: "Оборудки у мережі супермаркетів викрили на Волині", author: "Мудрий Антон", length: 180, day1Reads: 200, day2Reads: 110, publishTime: new Date(2026, 9, 2, 9, 5)},
  { id: 4, title: "Світоліна вийшла у чвертьфінал престижного тенісного турніру в Ухані", author: "Міхопарова Кіра", length: 220, day1Reads: 500, day2Reads: 320, publishTime: new Date(2026, 9, 2, 14, 30)},
  { id: 5, title: "Прем’єр Болгарії заявив про брак доказів причетності РФ до атак на судна у Чорному морі", author: "Сальніков Ілля", length: 400, day1Reads: 310, day2Reads: 200, publishTime: new Date(2026, 9, 3, 8, 20)},
  { id: 6, title: "Естонія надає 10 млн євро на зброю для України в рамках механізму PURL", author: "Мудрий Антон", length: 120, day1Reads: 90, day2Reads: 85, publishTime: new Date(2026, 9, 3, 20, 10)},
  { id: 7, title: "Синоптики прогнозують дощі по всій країні, в Карпатах – з мокрим снігом", author: "Міхопарова Кіра", length: 250, day1Reads: 275, day2Reads: 310, publishTime: new Date(2026, 9, 4, 12, 0)},
  { id: 8, title: "Обмеження в роботі Starlink для України: сенатор ініціював розслідування щодо Пентагону", author: "Сальніков Ілля", length: 190, day1Reads: 150, day2Reads: 140, publishTime: new Date(2026, 9, 4, 17, 45)},
  { id: 9, title: "Премʼєр Естонії: Чим швидше російські НПЗ будуть рознесені вщент, тим краще", author: "Міхопарова Кіра", length: 350, day1Reads: 410, day2Reads: 290, publishTime: new Date(2026, 9, 5, 10, 0)},
  { id: 10, title: "'Перевезти – це убити': Біляков відповів, чому слониху Венді досі не вивезли з Одеського зоопарку", author: "Мудрий Антон", length: 130, day1Reads: 180, day2Reads: 210, publishTime: new Date(2026, 9, 5, 21, 30)}
];

function sortNewsByAuthor(array) {
  return [...array].sort((a, b) => a.author.localeCompare(b.author, "uk"));
}

function avgMessageLengthByAuthor(array) {
  const authorStats = array.reduce((accum, item) => {
    if (!accum[item.author]) {
      accum[item.author] = { totalLength: 0, count: 0 };
    }
    accum[item.author].totalLength += item.length;
    accum[item.author].count += 1;
    return accum;
  }, {});

  const result = {};
  for (const author in authorStats) {
    result[author] = (authorStats[author].totalLength / authorStats[author].count).toFixed(2);
  }
  return result;
}

function findTopReadersDay1News(array) {
  return array.reduce((max, current) =>
    current.day1Reads > max.day1Reads ? current : max);
}

function addNews(array, newItem) {
  const isComplete = newItem.id && newItem.title && newItem.author && 
                    newItem.length && newItem.day1Reads !== undefined && 
                    newItem.day2Reads !== undefined && newItem.publishTime;
  if (isComplete) {
    array.unshift(newItem);
  } else {
    array.push(newItem);
  }
  return array;
}

function calculateAuthorPayment(array) {
  const payments = {};
  array.forEach(item => {
    if (!item.author || !item.publishTime || !item.length) return;

    const hour = item.publishTime.getHours();
    const isWorkingHours = hour >= 10 && hour < 18;
    const rate = isWorkingHours ? 0.5 : 0.8;
 
    payments[item.author] = (payments[item.author] || 0) + item.length * rate;
  });
 
  for (const author in payments) {
    payments[author] = +payments[author].toFixed(2);
  }
  return payments;
}

function calculateAuthorPaymentForDay(array, year, monthIndex, day) {
  return calculateAuthorPayment(array.filter(item =>
    item.publishTime &&
    item.publishTime.getFullYear() === year &&
    item.publishTime.getMonth() === monthIndex &&
    item.publishTime.getDate() === day
  ));
}

console.log("\nЗавдання 1:");
console.log("\n1а. Новини, впорядковані за автором:");
const sortedNews = sortNewsByAuthor(newsList);
console.log(sortedNews);
console.log("\n1а. Середня довжина повідомлення по авторах: ", avgMessageLengthByAuthor(sortedNews));
console.log("\n1б. Новина з максимальною кількістю читачів за добу 1:");
const topNews = findTopReadersDay1News(newsList);
console.log(`id = ${topNews.id}, "${topNews.title}" (day1Reads  = ${topNews.day1Reads})`);

console.log("\n1в. Додавання новин:");
addNews(newsList, { id: 11, title: "Повна новина", author: "Мудрий Антон", length: 100, day1Reads: 50, day2Reads: 60, publishTime: new Date(2026, 9, 6, 12, 0) });
console.log("Після додавання !повного! запису перший елемент масиву тепер:", newsList[0].title);
addNews(newsList, { title: "Неповна новина без ID та автора", length: 50 });
console.log("Після додавання !неповного! запису останній елемент масиву:", newsList[newsList.length - 1].title);
console.log("Довжина масиву новин зараз:", newsList.length);

console.log("\n1г. Сума оплати роботи по кожному автору (грн):", calculateAuthorPayment(newsList));
console.log("\nСума оплати роботи за 2 жовтня 2026: (грн):", calculateAuthorPaymentForDay(newsList, 2026, 9, 2));

class User {
  constructor(lastName, firstName, age, education, feedbackPurpose, contactDateTime) {
    this.lastName = lastName; 
    this.firstName = firstName;
    this._age = 0;
    this.education = education;
    this.purpose = feedbackPurpose;
    this.contactDateTime = contactDateTime;

    this.setAge(age);
  }

  getAge() {
    return this._age;
  }

  setAge(value) {
    if (typeof value === "number" && value > 0 && value < 120) {
      this._age = value;
    } else {
      console.log(`Некоректне значення віку для ${this.lastName}:`, value);
    }
  }

  get gender(){
    const lastChar = this.lastName.slice(-1).toLowerCase();
        return (lastChar === 'а' || lastChar === 'я') ? 'Жінка' : 'Чоловік';
  }
}

const users = [
    new User("Іванова", "Анна", 22, "вища", "співпраця", new Date(2026, 9, 15, 14, 30)),
    new User("Петренко", "Олег", 18, "без освіти", "пропозиція", new Date(2026, 8, 10, 11, 0)),
    new User("Шевченко", "Марія", 25, "вища", "скарга", new Date(2026, 9, 12, 16, 45)),
    new User("Коваленко", "Іван", 19, "без освіти", "інше", new Date(2026, 9, 15, 10, 20)),
    new User("Сидорова", "Олена", 18, "неповна", "співпраця", new Date(2026, 7, 5, 9, 15)),
    new User("Лисенко", "Дмитро", 30, "вища", "пропозиція", new Date(2026, 9, 20, 14, 0)),
    new User("Григор'єва", "Наталія", 28, "вища", "скарга", new Date(2026, 9, 22, 13, 30)),
    new User("Мельник", "Тарас", 45, "професійна", "співпраця", new Date(2026, 6, 11, 17, 10)),
    new User("Кравченко", "Софія", 18, "неповна", "інше", new Date(2026, 9, 1, 15, 0)),
    new User("Бойко", "Максим", 21, "без освіти", "пропозиція", new Date(2026, 9, 18, 12, 0))
];

function getUsersByMonthAndTime(usersList, targetMonthIndex, startHour, endHour){
  return usersList.filter(u =>
    u.contactDateTime.getMonth() === targetMonthIndex && 
    u.contactDateTime.getHours() >= startHour && 
    u.contactDateTime.getHours() < endHour
  );
}

function getMinAgeAndEdu(usersList) {
  let minAge = usersList[0].getAge();
  for (const u of usersList) {
    if (u.getAge() < minAge) minAge = u.getAge();
  }
 
  const youngestUsers = usersList.filter((u) => u.getAge() === minAge);
 
  return {
    minAge: minAge,
    typicalEducation: youngestUsers.map(u => u.education)
  };
}

function countUsersByClass(usersList) {
  const counts = [0, 0, 0];

  usersList.forEach(u => {
    if (u.gender === 'Жінка' && u.education === "вища") {
      counts[0]++;
    } else if (u.gender === 'Чоловік' && u.education === "без освіти") {
      counts[1]++;
    } else {
      counts[2]++;
    }
  });

  return counts;
}

function sortUsersByAgeDescAndAlph(usersList) {
    return [...usersList].sort((a, b) => {
        if (b.getAge() !== a.getAge()) {
            return b.getAge() - a.getAge();
        }
        const fullNameA = `${a.lastName} ${a.firstName}`;
        const fullNameB = `${b.lastName} ${b.firstName}`;
        return fullNameA.localeCompare(fullNameB, "uk");
    });
}

console.log("\nЗавдання 2:");

console.log("\n2а. Звернення у жовтні 2026 з 10:00 до 14:00:");
const byMonthAndTime = getUsersByMonthAndTime(users, 9, 10, 14);
console.log(byMonthAndTime.map(u => u.lastName));

console.log("\n2б. Мінімальний вік та типова освіта:");
const minAgeInfo = getMinAgeAndEdu(users);
console.log("Мінімальний вік:", minAgeInfo.minAge);
console.log("Типова освіта для цього віку:", minAgeInfo.typicalEducation);

console.log("\n2в. Розподіл користувачів на 3 класи:");
const counts = countUsersByClass(users);
console.log("Жінки з вищою освітою:", counts[0]);
console.log("Чоловіки без освіти:", counts[1]);
console.log("Інші:", counts[2]);

console.log("\n2г. Сортування за спаданням віку і алфавітом:");
const sortedUsers = sortUsersByAgeDescAndAlph(users);
sortedUsers.forEach(u => console.log(`${u.lastName} ${u.firstName} (${u.getAge()} р.)`));