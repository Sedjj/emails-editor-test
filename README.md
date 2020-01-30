## Emails-editor
Компонент формы с тегами для ввода emails.

### Технологии
Компонент написан на TypeScript и Less, сборка проектна осуществляется через webpack  

### Пример использования

Подключаем файл компонета
```html
<script type='text/javascript' src="https://cdn.rawgit.com/Sedjj/emails-editor-test/master/build/emails-editor.js"></script>
```
Устанавливаем необходимые шрифты. Название шрифта в компоненте `CustomFont`, поэтому делаем alias с таким же названием. Если этого не сделать то будет стандартный шрифт. 
```html
<style>
    @font-face {
        font-family: 'CustomFont';
        src: local("Open Sans"),
        url('https://cdn.rawgit.com/Sedjj/emails-editor-test/master/build/fonts/OpenSans.ttf') format('truetype');
    }
</style>
```
Вставляем на страницу контейнер с размерами, так как компонент растягивается под parent
```html
<div id="emails-editor" style="width: 700px;height: 370px;"></div>
  ```

После инициализируем компонет `EmailsEditor` и передаем в качестве параметров ссылку на контейнер и возможно предать заголовок формы
```html
<script>
    let options = {                            
        container: document.querySelector('#emails-editor'),
        header: 'Share <b>Board name</b> with other'
    };
    const emailsEditor = new EmailsEditor(options);
</script>
```

Компонент позволяет сделать подписку на изменения списка emails, где `name` может быть (`newTag, generateEmail, deleteTag, setEmails`), a в emails приходит массив строк `['john@test.com', 'patric@test.com']`  
```javascript
emailsEditor.subscribe(({name, emails}) => {
	console.log('emails-editor - name: ', name, ' emails: ', emails);
});
```  
Для добавления emails из кодв у компонента есть метод `setEmails` 
```javascript
emailsEditor.setEmails(['john@test.com', 'patric@test.com']);
```        
Для получения текущего списка emails `getEmails` 
```javascript
emailsEditorSupport.getEmails()
```                               

### Demo
Демонстрационный пример можно найти по ссылке [клик](https://sedjj.github.io/emails-editor-test/).
А в проекте это файл index.html

### Author
* Salimzebarov Eldar

### License
    This project is open source and available under the MIT License.