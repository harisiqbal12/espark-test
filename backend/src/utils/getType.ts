function getType(type: 'books' | 'news' | 'docs') {
	if (type === 'books') return 'BOOKS';
	if (type === 'docs') return 'DOCUMENTARIES';
	if (type === 'news') return 'NEWSPAPER';
}

export default getType;
