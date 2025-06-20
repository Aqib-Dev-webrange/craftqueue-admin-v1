export function getSupabaseImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    // Convert authenticated URL to public URL
    if (imagePath.includes('/storage/v1/object/authenticated/')) {
      return imagePath.replace('/storage/v1/object/authenticated/', '/storage/v1/object/public/');
    }
    return imagePath;
  }
  
  // If it's just a path, construct the public URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/${imagePath}`;
}