export const filterArticles = (articles, { keyword = '', category = 'Category...', startDate = null, endDate = null }) => {
  return articles.filter(a => {
    // 1. Keyword Filtering
    if (keyword) {
      const lowerKw = keyword.toLowerCase().trim();
      if (lowerKw) {
        const matchesTitle = a.title?.toLowerCase().includes(lowerKw);
        const matchesCategory = Array.isArray(a.category)
          ? a.category.some(c => c.toLowerCase().includes(lowerKw))
          : typeof a.category === 'string'
            ? a.category.toLowerCase().includes(lowerKw)
            : false;
        const matchesContent = a.textContent ? a.textContent.toLowerCase().includes(lowerKw) : false;
        
        if (!matchesTitle && !matchesCategory && !matchesContent) {
          return false;
        }
      }
    }

    // 2. Category Filtering (for Information Centre Dropdown)
    if (category !== 'Category...' && (!a.category || !a.category.includes(category))) {
      return false;
    }
    
    // 3. Date Range Filtering (for Information Centre DatePicker)
    if (startDate && endDate) {
      const articleDate = new Date(a.rawDate || a.date);
      if (!isNaN(articleDate)) {
        // Normalize time for comparison
        articleDate.setHours(0, 0, 0, 0);
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        
        if (articleDate < start || articleDate > end) {
          return false;
        }
      }
    }
    
    return true;
  });
};
