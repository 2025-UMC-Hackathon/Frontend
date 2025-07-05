import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

// --- Props 인터페이스 (className 제거) ---
interface TagDropdownProps {
  tags: string[];
  selectedTags: string[];
  onTagChange: (selected: string[]) => void;
  selectionMode?: 'single' | 'multiple';
  label?: string;
  placeholder?: string;
}

export default function TagDropdown({
  tags,
  selectedTags,
  onTagChange,
  selectionMode = 'single',
  label,
  placeholder = '태그를 선택하세요',
}: TagDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTagClick = (tag: string) => {
    let newSelected: string[];
    if (selectionMode === 'single') {
      newSelected = selectedTags.includes(tag) ? [] : [tag];
    } else {
      newSelected = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
    }
    onTagChange(newSelected);
    setIsOpen(false);
  };

  return (
    // w-auto를 사용해 컨테이너가 버튼 크기에 맞게 조절되도록 설정
    <div className="relative inline-block w-auto text-left" ref={dropdownRef}>
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      
      {/* --- 피그마 디자인에 맞게 모든 스타일을 여기에 직접 지정 --- */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center justify-between', 
          ' h-[30px] px-3',           
          'rounded-full',                    
          'border border-black/20',          
          'bg-white',                        
          'text-sm font-medium text-gray-800',
          'transition hover:bg-gray-50'      
        )}
      >
       
    <span className="truncate">
      {selectionMode === 'single' && selectedTags.length > 0 ? selectedTags[0] : placeholder}
    </span>
   
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 flex-shrink-0 text-gray-400">
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
      </button>

      {/* --- 드롭다운 메뉴 스타일 --- */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full min-w-max rounded-md border border-gray-200 bg-white shadow-lg">
          <ul>
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <li
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={clsx(
                    'cursor-pointer p-2 text-sm text-center',
                    'hover:bg-gray-100',
                    isSelected && 'bg-blue-50 font-semibold text-blue-600'
                  )}
                >
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}