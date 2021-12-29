
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
    return await res.json();
  };
  
const getResorce = async (url) => {
  const res = await fetch(url);
  //використовуємо встроєні ресурси які передаються в проміс для налагодження виводу, якщо винекне помилка яка не пов'язана із сервером чи інтернетом
  //Для цього використовуємо умову, якщо щось у нашому запросі res пішло щось не так виводимо
  if (!res.ok) {
    //використовуємо об'єкт помилки
    throw new Error(`Викидуємо нову помилку ${url} status = ${res.status}`);
  }
  return await res.json();
};


export {postData};
export {getResorce};