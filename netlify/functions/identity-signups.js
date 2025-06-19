exports.handler = async (event, context) => {
  const { user } = JSON.parse(event.body);
  console.log('New user signed up:', user.email);
  return { statusCode: 200 };
};