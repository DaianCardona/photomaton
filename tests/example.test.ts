import { describe, it, expect } from 'vitest'
import { DEFAULT_SETTINGS } from '@shared/settings'
import { IpcChannels } from '@shared/ipc-contract'
import { cn } from '@renderer/lib/utils'

describe('shared/settings', () => {
  it('tiene valores por defecto coherentes', () => {
    expect(DEFAULT_SETTINGS.locale).toBe('es')
    expect(DEFAULT_SETTINGS.kioskMode).toBe(false)
    expect(DEFAULT_SETTINGS.dataDir).toBeNull()
  })
})

describe('shared/ipc-contract', () => {
  it('expone el canal app:get-info', () => {
    expect(IpcChannels.appGetInfo).toBe('app:get-info')
  })
})

describe('renderer/lib cn()', () => {
  it('combina y deduplica clases de Tailwind', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-sm', false, 'font-bold')).toBe('text-sm font-bold')
  })
})
