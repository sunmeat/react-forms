import React, { useState, useEffect, useRef } from "react";
import '../styles/form.css';

const Form = () => {

  useEffect(() => {
    document.title = "React Forms";
  }, []);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    name: "",
    address: "",
    country: "",
    zipCode: "",
    email: "",
    sex: "Мужской",
    languages: {
      english: false,
      nonEnglish: false,
    },
    about: ""
  });

  const [submittedData, setSubmittedData] = useState(null);

  // useRef(null) создаёт объект, который позволяет хранить ссылку на DOM-элемент после его рендеринга
  // этот объект используется для того, чтобы напрямую взаимодействовать с элементом,
  // например, чтобы получить доступ к загруженному файлу через <input type="file">
  const photoInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        languages: {
          ...formData.languages,
          [name]: checked
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // предотвращение стандартного действия браузера — отправку формы и перезагрузку страницы
    // вместо этого можно выполнять кастомные действия, такие как валидация данных или отправка данных на сервер с помощью JavaScript


    if (formData.userId.length < 5 || formData.userId.length > 7) {
      alert("ID пользователя должен быть от 5 до 7 символов.");
      return;
    }

    if (formData.password.length < 7 || formData.password.length > 12) {
      alert("Пароль должен быть от 7 до 12 символов.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Введите корректный адрес электронной почты.");
      return;
    }

    const photoFile = photoInputRef.current.files[0];
    let photoMessage = "Нет фото";
    if (photoFile) {
      photoMessage = `Фото: ${photoFile.name}`;
    }

    setSubmittedData({
      photo: photoMessage,
      formData: JSON.stringify(formData, null, 2)
    });
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          ID пользователя [от 5 до 7 символов]:
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            minLength="5"
            maxLength="7"
            required
          />
        </label>

        <label>
          Пароль [от 7 до 12 символов]:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength="7"
            maxLength="12"
            required
          />
        </label>

        <label>
          Имя [только буквы]:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            pattern="[A-Za-zА-Яа-яЁё ]+"
            required
          />
        </label>

        <label>
          Домашний адрес [буквы и цифры]:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            pattern="[A-Za-z0-9 А-Яа-яЁё,.]+"
            required
          />
        </label>

        <label>
          Страна:
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">(Пожалуйста, выберите страну проживания)</option>
            <option value="Украина">Украина</option>
            <option value="Польша">Польша</option>
            <option value="Германия">Германия</option>
            <option value="Франция">Франция</option>
            <option value="Испания">Испания</option>
            <option value="Нидерланды">Нидерланды</option>
          </select>
        </label>

        <label>
          Почтовый индекс [буквы и цифры]:
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            pattern="[A-Za-z0-9]+"
            required
          />
        </label>

        <label>
          Эл.почта [корректная]:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Пол:
          <input
            type="radio"
            name="sex"
            value="Женский"
            checked={formData.sex === "Женский"}
            onChange={handleChange}
          />
          Женский
          <input
            type="radio"
            name="sex"
            value="Мужской"
            checked={formData.sex === "Мужской"}
            onChange={handleChange}
          />
          Мужской
        </label>

        <label>
          Языки:
          <input
            type="checkbox"
            name="english"
            checked={formData.languages.english}
            onChange={handleChange}
          />
          Английский
          <input
            type="checkbox"
            name="nonEnglish"
            checked={formData.languages.nonEnglish}
            onChange={handleChange}
          />
          Французский
        </label>

        <label>
          Дополнительная информация:
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
          />
        </label>

        <label>
          Прикрепите фото:
          <input
            type="file"
            ref={photoInputRef}
            accept="image/*"
          />
        </label>

        <button type="submit">Отправить данные на сервер</button>
      </form>

      { }
      {submittedData && (
        <div className="submitted-data">
          <h3>Отправленные данные:</h3>
          <p>{submittedData.photo}</p>
          <pre>{submittedData.formData}</pre>
        </div>
      )}
    </div>
  );
};

export default Form;