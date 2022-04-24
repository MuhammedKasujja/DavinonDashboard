import Entity, { EntityId } from './Entity'

import Organization from './Organization'
import OrganizationToUser from './OrganizationToUser'

export type UserId = EntityId

// global user role across the system (useful for SAAS or if organizations arn't used)
// Each user can have only one global role
export type UserGlobalRole = 'admin' | 'support' | 'member'

export interface UserSubmissionData {
  firstName?: string
  lastName?: string
  displayName?: string
  username?: string | null
  email: string
  enabled: boolean
  password?: string
  photoUrl?: string
  lastLogin:string
  role:string
  userId?:string
  globalRole?: UserGlobalRole
}

export default interface User extends UserSubmissionData, Entity {
  id: UserId
  organizations?: Organization[]
  userToOrganizations?: OrganizationToUser[]
}
