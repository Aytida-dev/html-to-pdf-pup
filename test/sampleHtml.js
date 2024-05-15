const htmlData = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sample HTML for PDF Conversion</title>
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
  }
  header {
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
  }
  main {
    margin: 20px;
  }
  h1 {
    color: #333;
  }
  p {
    color: #666;
  }
  .container {
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
  }
</style>
</head>
<body>
  <header>
    <h1>Sample HTML for PDF Conversion</h1>
  </header>
  <main>
    <div class="container">
      <h2>Welcome to our website!</h2>
      <p>This is a sample HTML document that you can use to test your HTML to PDF conversion functionality.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed mauris a justo convallis malesuada. Donec sit amet ex nec velit dapibus ultricies. Vivamus congue metus vitae justo fringilla, sed lacinia libero mattis. Integer non orci tristique, hendrerit libero at, scelerisque nisi. In in lectus non mi feugiat gravida. Integer vel pharetra nunc. Mauris viverra augue eu enim dignissim, in volutpat tellus condimentum. Integer auctor id mi et lacinia. Pellentesque quis enim felis. Fusce viverra feugiat risus et varius.</p>
      <a href="#" class="button">Click Me</a>
    </div>
  </main>
</body>
</html>

`

module.exports = { htmlData }