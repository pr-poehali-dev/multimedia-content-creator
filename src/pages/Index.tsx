import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type MediaType = 'video' | 'audio' | 'image' | 'text' | 'link';
type Category = 'Достопримечательность' | 'Аудио' | 'Блюда';

interface MediaItem {
  id: string;
  type: MediaType;
  category: Category;
  title: string;
  description?: string;
  url?: string;
  content?: string;
  thumbnail?: string;
}

const Index = () => {
  const [items, setItems] = useState<MediaItem[]>([
    {
      id: '1',
      type: 'video',
      category: 'Достопримечательность',
      title: 'Мечеть Кул Шариф в Казани',
      description: 'Величественная мечеть в сердце Казанского Кремля',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400',
    },
    {
      id: '2',
      type: 'audio',
      category: 'Аудио',
      title: 'Новогодняя сказка',
      description: 'Волшебная история для всей семьи',
      url: 'https://example.com/novogodnyaya-skazka.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400',
    },
    {
      id: '3',
      type: 'image',
      category: 'Блюда',
      title: 'Губадия',
      description: 'Традиционный татарский новогодний пирог с многослойной начинкой',
      thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    },
    {
      id: '4',
      type: 'image',
      category: 'Блюда',
      title: 'Оливье',
      description: 'Символ русского Нового года - салат с курицей и овощами',
      thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MediaItem>>({
    type: 'image',
    category: 'Достопримечательность',
  });
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const handleAddItem = () => {
    if (!newItem.title) {
      toast.error('Укажите название');
      return;
    }

    const item: MediaItem = {
      id: Date.now().toString(),
      type: newItem.type as MediaType,
      category: newItem.category as Category,
      title: newItem.title,
      description: newItem.description,
      url: newItem.url,
      content: newItem.content,
      thumbnail: newItem.thumbnail,
    };

    setItems([item, ...items]);
    setIsOpen(false);
    setNewItem({ type: 'image', category: 'Достопримечательность' });
    toast.success('Материал добавлен!');
  };

  const filteredItems = activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory);

  const getIcon = (type: MediaType) => {
    const icons = {
      video: 'Video',
      audio: 'Music',
      image: 'Image',
      text: 'FileText',
      link: 'Link',
    };
    return icons[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Sparkles" className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                MediaHub
              </h1>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  <Icon name="Plus" size={20} />
                  Добавить материал
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Добавить материал</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Тип материала</Label>
                    <Select value={newItem.type} onValueChange={(value) => setNewItem({ ...newItem, type: value as MediaType })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">🎥 Видео</SelectItem>
                        <SelectItem value="audio">🎵 Аудио</SelectItem>
                        <SelectItem value="image">🖼️ Изображение</SelectItem>
                        <SelectItem value="text">📝 Текст</SelectItem>
                        <SelectItem value="link">🔗 Ссылка</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value as Category })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Достопримечательность">🏛️ Достопримечательность</SelectItem>
                        <SelectItem value="Аудио">🎧 Аудио</SelectItem>
                        <SelectItem value="Блюда">🍽️ Блюда</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Название</Label>
                    <Input
                      id="title"
                      placeholder="Введите название"
                      value={newItem.title || ''}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      placeholder="Добавьте описание"
                      value={newItem.description || ''}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  {(newItem.type === 'video' || newItem.type === 'audio' || newItem.type === 'image' || newItem.type === 'link') && (
                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        placeholder="https://example.com/file"
                        value={newItem.url || ''}
                        onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                      />
                    </div>
                  )}

                  {newItem.type === 'text' && (
                    <div className="space-y-2">
                      <Label htmlFor="content">Текстовое содержимое</Label>
                      <Textarea
                        id="content"
                        placeholder="Введите текст"
                        value={newItem.content || ''}
                        onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                        rows={5}
                      />
                    </div>
                  )}
                </div>
                <Button onClick={handleAddItem} className="w-full bg-gradient-to-r from-primary to-secondary">
                  Добавить
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as Category | 'all')} className="mb-8">
          <TabsList className="bg-white/80 backdrop-blur-sm p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              Все
            </TabsTrigger>
            <TabsTrigger value="Достопримечательность" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              🏛️ Достопримечательности
            </TabsTrigger>
            <TabsTrigger value="Аудио" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              🎧 Аудио
            </TabsTrigger>
            <TabsTrigger value="Блюда" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              🍽️ Блюда
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Icon name="Inbox" size={40} className="text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-foreground">Пока пусто</h3>
            <p className="text-muted-foreground mb-6">Добавьте первый материал в эту категорию</p>
            <Button onClick={() => setIsOpen(true)} className="bg-gradient-to-r from-primary to-secondary">
              <Icon name="Plus" size={20} />
              Добавить материал
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover-scale fade-in border-2 hover:border-primary/50 transition-all cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="p-0">
                  {item.thumbnail ? (
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Icon name={getIcon(item.type)} size={20} className="text-primary" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
                      <Icon name={getIcon(item.type)} size={48} className="text-primary" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-1">{item.title}</CardTitle>
                  {item.description && <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>}
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{item.category}</span>
                    <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary font-medium capitalize">{item.type}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;