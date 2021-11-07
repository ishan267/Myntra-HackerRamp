#!/usr/bin/env python
# coding: utf-8

# In[6]:


import os
import nltk
#import nltk.corpus
#from nltk.corpus import brown
from nltk.tokenize import word_tokenize
import re


# In[7]:

products = ["short","pant","bellie","shirt","tshirt","lower","jean","clock","decal","sticker","decor","pant","shoe","bracelet","sneaker","sandal","sunscreen","bedsheet","pillow","cushion","cup","perfume","swimwear","bra","necklace","floater","car","mat","watch","wallet","cloth","clothe","jacket","boot","sweater","trouser","hoodie","kurti","suit","handbag","jewellery","makeup","skirt","sweatshirt","shawl","saree","mobile","phone","smartphone","headset","headphone","earbud","powerbank","chain","phone cover","mobile cover","tablet","note","speaker","earphone","smartwatch","laptop","computer","pc","camera","mouse","keyboard","cpu","ram","printer","monitor","home theatre","router","pendrive","memory card","tv","television","ac","air conditioner","fridge","refrigerator","washing machine","dishwasher","mircowave","chimney"]
ln = len(products)
for i in range(ln):
    products.append(products[i]+"s")
    
def get_products(text):
    text_tokens = word_tokenize(text)
    punctuation=re.compile(r'[-.?!,:;()]')

    post_punctuation=[]
    for words in text_tokens:
        word=punctuation.sub("",words)
        if len(word)>0:
            post_punctuation.append(word)
    
    prods=[]
    specs=[]
    
    for token in post_punctuation:
        print(nltk.pos_tag([token]))
        first = nltk.pos_tag([token])[0][0]
        second = nltk.pos_tag([token])[0][1]
        if(second=='NN' or second=='NNS'):
            if products.count(first)>0:
                prods.append(first)
        if(second=='JJ' or second=='JJR' or second=='JJS'):
            specs.append(first)
    
    return prods,specs
        


# In[17]:


#prods,specs = get_products("i need narrow pants")


# In[18]:


#prods


# In[19]:


#specs


# In[ ]:




