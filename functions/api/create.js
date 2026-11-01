export async function onRequestPost({request,env}){
  const {title,content,nick}=await request.json();
  if(!title||!content)return new Response('missing',{status:400});
  await env.DB.prepare('INSERT INTO posts(title,content,nick) VALUES(?,?,?)').bind(title,content,nick||'匿名').run();
  return new Response('ok');
}
