export function api(url: string, init?: RequestInit): Promise<Response> {
  if (localStorage.getItem('useCustomApiUrl') === 'true' && localStorage.getItem('apiUrl'))
    return fetch(localStorage.getItem('apiUrl') + url, init)
  else
    return fetch(`https://api.todo.uyou.org.cn${url}`, init)
}
