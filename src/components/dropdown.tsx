import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

interface TagDropdownProps {
  tags: string[];
  selectedTags: string[];
  onTagChange: (selected: string[]) => void;
  selectionMode?: 'single' | 'multiple';
  label?: string;
  placeholder?: string;
}

const TagDropdown = ({
  tags,
  selectedTags,
  onTagChange,
  selectionMode = 'multiple',     //default 값 multiple로 설정
  label,
  placeholder = '태그를 선택하세요',
}: TagDropdownProps) => {
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
      setIsOpen(false);
    } else {
      newSelected = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
    }
    onTagChange(newSelected);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
   
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-[38px] w-full items-center justify-between rounded-md border border-gray-300 bg-white p-2 text-left"
      >
        <span className="text-gray-700">
          {placeholder}
        </span>
        <span>▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          <ul>
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <li
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={clsx(
                    'cursor-pointer p-2 hover:bg-gray-100',
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
};

export default TagDropdown;