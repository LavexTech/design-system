/**
 * Retorna a URL da imagem de perfil do usuário.
 * Se o usuário não tiver uma foto de perfil cadastrada, retorna uma imagem padrão
 * baseada no tipo de usuário (client ou provider).
 * 
 * @param profileImage - URL da foto de perfil do usuário (pode ser vazia, null ou undefined)
 * @param userType - Tipo do usuário: 'client' ou 'provider'
 * @returns URL da imagem de perfil ou URL padrão se não houver foto cadastrada
 */
export function getProfileImageUrl(
  profileImage: string | null | undefined,
  userType: 'client' | 'provider'
): string {
  // Se não houver profileImage ou estiver vazio, retorna a imagem padrão
  if (!profileImage || profileImage.trim() === '') {
    return userType === 'client'
      ? 'https://avatar.iran.liara.run/public/21'
      : 'https://avatar.iran.liara.run/public/71';
  }
  
  return profileImage;
}

