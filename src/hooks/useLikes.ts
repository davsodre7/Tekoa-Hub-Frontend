import { useState, useEffect } from 'react';

interface UseLikesReturn {
  isLiked: boolean;
  likesCount: number;
  toggleLike: () => void;
}

export const useLikes = (contentId: string, initialLikesCount: number = 0): UseLikesReturn => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  // Carregar estado inicial do localStorage
  useEffect(() => {
    const likedContent = JSON.parse(localStorage.getItem('likedContent') || '{}');
    const storedLikesCount = JSON.parse(localStorage.getItem('likesCount') || '{}');
    
    setIsLiked(likedContent[contentId] || false);
    setLikesCount(storedLikesCount[contentId] || initialLikesCount);
  }, [contentId, initialLikesCount]);

  const toggleLike = () => {
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;
    
    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    // Salvar no localStorage
    const likedContent = JSON.parse(localStorage.getItem('likedContent') || '{}');
    const storedLikesCount = JSON.parse(localStorage.getItem('likesCount') || '{}');
    
    likedContent[contentId] = newIsLiked;
    storedLikesCount[contentId] = newLikesCount;
    
    localStorage.setItem('likedContent', JSON.stringify(likedContent));
    localStorage.setItem('likesCount', JSON.stringify(storedLikesCount));

    // Aqui você pode adicionar a chamada para a API do backend
    // await api.toggleLike(contentId, newIsLiked);
  };

  return {
    isLiked,
    likesCount,
    toggleLike,
  };
}; 