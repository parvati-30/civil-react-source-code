const API_BASE = import.meta.env.VITE_API_BASE || ''

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed (${res.status})`)
  }
  return res.json()
}

export const api = {
  getProjects: (filters = {}) => {
    const qs = new URLSearchParams()
    if (filters.status) qs.set('status', filters.status)
    if (filters.type) qs.set('type', filters.type)
    const q = qs.toString()
    return request(`/api/projects${q ? `?${q}` : ''}`)
  },
  getProject: (id) => request(`/api/projects/${id}`),
  createProject: (data) =>
    request('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id, data) =>
    request(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateProjectStatus: (id, status) =>
    request(`/api/projects/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  getClients: () => request('/api/clients'),
  createClient: (data) =>
    request('/api/clients', { method: 'POST', body: JSON.stringify(data) }),
}
